<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getEmployees($conn) {
    $sql = "SELECT e.name, jp.name AS job, d.name as department, e.salary, e.email, e.dob, o.name AS office, 
            e.home_address, e.contract, e.nin, e.leave_days_REMAINING
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

// function getEmployees($conn) {
//     header('Content-Type: application/json');
//     $sql = "SELECT 
//             e.employee_id, e.name, jd.name AS job_title, d.name AS department,
//             e.salary, e.email, e.dob, o.name AS office_name, e.home_address,
//             e.hired_date, e.contract, e.nin, e.status, e.leave_days_used, e.leave_days_REMAINING
//         FROM
//             Employee e
//         LEFT JOIN
//             Job_Position jd ON e.position_id = jd.position_id
//         LEFT JOIN 
//             Department d ON jd.department_id = d.department_id
//         LEFT JOIN 
//             Office o ON e.office_id = o.office_id";
//     $employees = [];
//     while ($row = $result->fetch_assoc()) {
//         $employees[] = $row;
//     }
//     echo json_encode($employees);
// }

function getEmployeeById($conn, $id) {
    header('Content-Type: application/json');
    $sql = "SELECT e.name, jd.name AS job, e.salary, e.email, e.dob, o.name AS office, 
        e.home_address, e.contract, e.nin, e.leave_days_REMAINING
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

        $name = $data['name'];
        $position_id = $data['job'];
        $salary = $data['salary'];
        $email = $data['email'];
        $dob = $data['dob'];
        $office_id = $data['office'];
        $home_address = $data['address'];
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