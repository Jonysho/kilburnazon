<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, PUT, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getPromotions($conn) {
    $sql = "SELECT e.name, p.promotion_date, p.previous_salary, p.new_salary, p.promotion_percentage, p.remarks
            FROM promotions p LEFT JOIN Employee e ON p.employee_id = e.employee_id ORDER BY promotion_date DESC";
    $result = $conn->query($sql);

    $promotions = [];
    while ($row = $result->fetch_assoc()) {
        $promotions[] = $row;
    }

    echo json_encode($promotions);
}

function promote($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (!isset($data['id']) || !isset($data['percentage'])) {
        echo json_encode(["status" => "error", "message" => "Employee ID and promotion percentage are required."]);
        http_response_code(400);
        exit();
    }

    $employee_id = $data['id'];
    $promotion_percentage = $data['percentage'];
    error_log("Promoting employee with ID: $employee_id");
    try {
        // Start transaction
        $conn->begin_transaction();

        // Retrieve current salary of the employee
        $query = "SELECT salary FROM employee WHERE employee_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $employee_id);
        $stmt->execute();
        $stmt->bind_result($current_salary);
        $stmt->fetch();
        $stmt->close();

        if ($current_salary === null) {
            throw new Exception("Employee not found.");
        }

        // Calculate new salary
        $new_salary = $current_salary * (1 + $promotion_percentage / 100);

        // Update employee's salary
        $update_query = "UPDATE employee SET salary = ? WHERE employee_id = ?";
        $update_stmt = $conn->prepare($update_query);
        $update_stmt->bind_param("di", $new_salary, $employee_id);
        $update_stmt->execute();
        $update_stmt->close();
        
        // Insert promotion record
        $insert_query = "INSERT INTO promotions (employee_id, promotion_percentage, previous_salary, promotion_date) VALUES (?, ?, ?, CURDATE())";
        $insert_stmt = $conn->prepare($insert_query);
        $insert_stmt->bind_param("idd", $employee_id, $promotion_percentage, $current_salary);
        $insert_stmt->execute();
        $insert_stmt->close();
        $conn->commit();
        
        echo json_encode(["status" => "success", "message" => "Promotion applied successfully."]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        $conn->rollback();
        error_log("Error promoting employee: " . $e->getMessage());
        http_response_code(500);
    }
}