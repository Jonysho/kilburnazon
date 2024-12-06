<?php
require_once './db/config.php';

// Parse the request URL and method
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

/**
 * Handle requests related to employees.
 */
function handleEmployees($conn, $method) {
    require './controllers/employees.php';
    switch ($method) {
        case 'GET':
            if (isset($_GET["id"])) {
                getEmployeeById($conn, $_GET['id']);
            } else {
                getEmployees($conn);
            }
            break;
        case 'POST':
            addEmployee($conn);
            break;
        case 'PUT':
            updateEmployee($conn);
            break;
        default:
            sendErrorResponse(405, "Method not allowed");
            break;
    }
}

/**
 * Handle employee promotions.
 */
function handleEmployeePromotion($conn, $method) {
    require './controllers/promotion.php';
    if ($method === 'POST') {
        promote($conn);
    } else {
        sendErrorResponse(405, "Method not allowed");
    }
}

/**
 * Handle leave requests (approve, reject, or create requests).
 */
function handleLeaveRequest($conn, $method, $request) {
    require './controllers/leave.php';
    if ($method === 'POST') {
        requestLeave($conn);
    } elseif ($method === 'GET') {
        if (strpos($request, '/request') !== false) {
            getRequests($conn);
        } else if (strpos($request, '/quarter') !== false){
            getDataByQuarter($conn, $_GET['start'], $_GET['end']);
        } else {
            getDataByDepartment($conn, $_GET['start'], $_GET['end']);
        }
    } elseif ($method === 'PUT') {
        if (strpos($request, '/approve') !== false) {
            approveLeave($conn);
        } elseif (strpos($request, '/reject') !== false) {
            rejectLeave($conn);
        } else {
            sendErrorResponse(404, "Action not found");
        }
    } else {
        sendErrorResponse(405, "Method not allowed");
    }
}

/**
 * Handle general information endpoints (departments, locations, etc.).
 */
function handleInfo($conn, $method, $infoType) {
    if ($method === 'GET') {
        require './controllers/info.php';
        switch ($infoType) {
            case 'departments':
                getDepartments($conn);
                break;
            case 'locations':
                getLocations($conn);
                break;
            case 'jobs':
                getJobs($conn);
                break;
            case 'offices':
                getOffices($conn);
                break;
            default:
                sendErrorResponse(404, "Info type not found");
                break;
        }
    } else {
        sendErrorResponse(405, "Method not allowed");
    }
}

/**
 * Send a JSON error response with a status code and message.
 */
function sendErrorResponse($code, $message) {
    http_response_code($code);
    echo json_encode(["message" => $message]);
}

// Routing logic
switch (true) {
    case $request === '/api/employees':
        handleEmployees($conn, $method);
        break;

    case $request === '/api/employees/promote':
        handleEmployeePromotion($conn, $method);
        break;

    case strpos($request, '/api/employees/leave') === 0:
        handleLeaveRequest($conn, $method, $request);
        break;

    case $request === '/api/info/departments':
        handleInfo($conn, $method, 'departments');
        break;

    case $request === '/api/info/locations':
        handleInfo($conn, $method, 'locations');
        break;

    case $request === '/api/info/jobs':
        handleInfo($conn, $method, 'jobs');
        break;

    case $request === '/api/info/offices':
        handleInfo($conn, $method, 'offices');
        break;
    
    case $request === '/api/birthday':
        require './controllers/birthday.php';
        getEmployees($conn);

    case $request === '/api/audit':
        require './controllers/audit.php';
        getAuditLogs($conn);
        break;

    default:
        sendErrorResponse(404, "Endpoint not found");
        break;
}
?>
