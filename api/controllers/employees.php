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

function getEmployees($conn) {
    $sql = "SELECT e.employee_id, e.name, jp.name AS job, d.name as department, e.salary, e.email, e.dob, o.name AS office, 
            e.home_address, e.contract, e.nin, hired_date, e.remaining_leave
            FROM employee e
            LEFT JOIN job_position jp ON e.position_id = jp.position_id
            LEFT JOIN department d ON jp.department_id = d.department_id
            LEFT JOIN office o ON e.office_id = o.office_id";
    $result = $conn->query($sql);

    $employees = [];
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }

    echo json_encode($employees);
}

function getEmployeeById($conn, $id) {
    header('Content-Type: application/json');
    $sql = "SELECT e.employee_id, e.name, jd.position_id AS job, e.salary, e.email, e.dob, o.office_id AS office, 
        e.home_address, e.contract, e.nin, hired_date
        FROM
            Employee e
        LEFT JOIN
            Job_Position jd ON e.position_id = jd.position_id
        LEFT JOIN
            Department d ON jd.department_id = d.department_id
        LEFT JOIN
            Office o ON e.office_id = o.office_id
        WHERE e.employee_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $employee = $result->fetch_assoc();
    echo json_encode($employee);
}

function addEmployee($conn) {
    try {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        // Validate input
        if (!isset($data['name']) || !isset($data['job']) || !isset($data['salary']) || !isset($data['email']) ||
            !isset($data['dob']) || !isset($data['office']) || !isset($data['home_address']) || !isset($data['hired_date']) || !isset($data['contract']) || !isset($data['nin'])) {
            echo json_encode(["status" => "error", "message" => "Invalid input."]);
            http_response_code(400);
            exit();
        }

        $name = $data['name'];
        $position_id = $data['job'];
        $salary = $data['salary'];
        $email = $data['email'];
        $dob = $data['dob'];
        $office_id = $data['office'];
        $home_address = $data['hired_address'];
        $hired_date = $data['hired_date'];
        $contract = $data['contract'];
        $nin = $data['nin'];

        $sql = "INSERT INTO employee (name, position_id, salary, email, dob, office_id, home_address, hired_date, contract, nin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sisssissss", $name, $position_id, $salary, $email, $dob, $office_id, $home_address, $hired_date, $contract, $nin);
        
        if ($stmt->execute()) {
            error_log("Employee added successfully");
            http_response_code(201);
            echo json_encode(["message" => "Employee added successfully"]);
        } else {
            throw new Exception("Error adding employee: " . $stmt->error);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => $e->getMessage()]);
    } finally {
        $stmt->close();
    }
}
function updateEmployee($conn) {
    try {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate input
        if (!isset($input['id']) || !isset($input['name']) || !isset($input['job']) || !isset($input['salary']) || !isset($input['email']) || 
            !isset($input['dob']) || !isset($input['office']) || !isset($input['home_address']) || !isset($input['hired_date']) || !isset($input['contract']) || !isset($input['nin'])) {
            echo json_encode(["status" => "error", "message" => "Invalid input."]);
            http_response_code(400);
            exit();
        }

        $id = $data['id'];
        $name = $data['name'];
        $position_id = $data['job'];
        $salary = $data['salary'];
        $email = $data['email'];
        $dob = $data['dob'];
        $office_id = $data['office'];
        $home_address = $data['home_address'];
        $hired_date = $data['hired_date'];
        $contract = $data['contract'];
        $nin = $data['nin'];
        
        $sql = "UPDATE employee SET name = ?, position_id = ?, salary = ?, email = ?, dob = ?, office_id = ?, home_address = ?, hired_date = ?, contract = ?, nin = ? WHERE employee_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sisssissssi", $name, $position_id, $salary, $email, $dob, $office_id, $home_address, $hired_date, $contract, $nin, $id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Employee updated successfully"]);
        } else {
            throw new Exception("Error updating employee: " . $stmt->error);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => $e->getMessage()]);
    } finally {
        $stmt->close();
    }
}