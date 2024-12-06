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

function requestLeave ($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $employee_id = $data['employee_id'];
    $leave_type = $data['leave_type'];
    $start_date = $data['start_date'];
    $end_date = $data['end_date'];
    $reason = $data['reason'];
    try {
        $sql = "INSERT INTO leave_request (employee_id, leave_type, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("issss", $employee_id, $leave_type, $start_date, $end_date, $reason);
        $stmt->execute();
        $stmt->close();
        echo json_encode(["status" => "success", "message" => "Leave request submitted."]);
    } catch (Exception $e) {
        error_log("Error: " . $e->getMessage());
        echo json_encode(["status" => "error", "message" => "Failed to submit leave request."]);
        http_response_code(400);
        exit();
    }
}

function approveLeave ($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $request_id = $data;
    try {
        $sql = "UPDATE leave_request SET status = 'Approved' WHERE request_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $request_id);
        $stmt->execute();
        $stmt->close();

        // Retrieve employee_id from leave_request
        $sql = "SELECT employee_id FROM leave_request WHERE request_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $request_id);
        $stmt->execute();
        $stmt->bind_result($employee_id);
        $stmt->fetch();
        $stmt->close();

        // Retrieve start_date and end_date from leave_request
        $sql = "SELECT start_date, end_date FROM leave_request WHERE request_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $request_id);
        $stmt->execute();
        $stmt->bind_result($start_date, $end_date);
        $stmt->fetch();
        $stmt->close();

        // Calculate the number of leave days
        $days = (strtotime($end_date) - strtotime($start_date)) / (60 * 60 * 24);

        // Update employee's leave_remaining
        $sql = "UPDATE employee SET remaining_leave = remaining_leave - ? WHERE employee_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $days, $employee_id);
        $stmt->execute();
        $stmt->close();
        echo json_encode(["status" => "success", "message" => "Leave request approved."]);
    } catch (Exception $e) {
        error_log("Error: " . $e->getMessage());
        echo json_encode(["status" => "error", "message" => "Failed to approve leave request."]);
        http_response_code(400);
        exit();
    }
}

function rejectLeave ($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $request_id = $data;
    try {
        $sql = "UPDATE leave_request SET status = 'Rejected' WHERE request_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $request_id);
        $stmt->execute();
        $stmt->close();
        echo json_encode(["status" => "success", "message" => "Leave request rejected."]);
    } catch (Exception $e) {
        error_log("Error: " . $e->getMessage());
        echo json_encode(["status" => "error", "message" => "Failed to reject leave request."]);
        http_response_code(400);
        exit();
    }
}

function getRequests ($conn) {
    $sql = "SELECT lr.request_id as id, e.name as name, lr.leave_type, lr.start_date, lr.end_date, lr.reason, lr.status, created_at 
            FROM leave_request lr 
            JOIN employee e ON lr.employee_id = e.employee_id
            ORDER BY created_at DESC";
    $result = $conn->query($sql);

    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }

    echo json_encode($requests);
}

function getDataByDepartment ($conn, $min_date, $max_date) {
    $sql = "SELECT 
                lr.leave_type, 
                SUM(DATEDIFF(lr.end_date, lr.start_date) + 1) AS total_leave_days,
                d.name AS department
            FROM 
                leave_request lr
            JOIN 
                employee e ON lr.employee_id = e.employee_id
            JOIN 
                job_position jp ON e.position_id = jp.position_id
            JOIN 
                department d ON jp.department_id = d.department_id
            WHERE 
                lr.status = 'Approved' AND lr.start_date >= ? AND lr.end_date <= ?
            GROUP BY 
                lr.leave_type, d.name
            ORDER BY 
                d.name, lr.leave_type";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $min_date, $max_date);
    $stmt->execute();
    $result = $stmt->get_result();

    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }
    echo json_encode($requests);
}

function getDataByQuarter ($conn, $min_date, $max_date) {
    $sql = "SELECT 
                lr.leave_type, 
                SUM(DATEDIFF(lr.end_date, lr.start_date) + 1) AS total_leave_days,
                CONCAT('Q', QUARTER(lr.start_date)) AS quarter
            FROM 
                leave_request lr
            WHERE 
                lr.status = 'Approved' 
                AND lr.start_date >= ? 
                AND lr.end_date <= ?
            GROUP BY 
                lr.leave_type, QUARTER(lr.start_date)
            ORDER BY 
                QUARTER(lr.start_date), lr.leave_type;";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $min_date, $max_date);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }
    echo json_encode($requests);
}