<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
function getEmployees($conn) {
    header('Content-Type: application/json');
    $sql = "SELECT * FROM employee";
    $result = $conn->query($sql);

    $employees = [];
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }

    echo json_encode($employees);
}

function addEmployee($conn) {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'];
    $job_title = $data['job_title'];

    $sql = "INSERT INTO employees (name, job_title) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $name, $job_title);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Employee added successfully"]);
    } else {
        echo json_encode(["message" => "Error adding employee"]);
    }

    $stmt->close();
}
?>
