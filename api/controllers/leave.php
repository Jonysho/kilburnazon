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
    $sql = "SELECT lr.request_id as id, e.name as name, lr.leave_type, lr.start_date, lr.end_date, lr.reason, lr.status, created_at FROM leave_request lr JOIN employee e ON lr.employee_id = e.employee_id";
    $result = $conn->query($sql);

    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }

    echo json_encode($requests);
}