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
