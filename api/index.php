<?php
require_once './db/config.php';

$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

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
        // case 'DELETE':
        //     deleteEmployee($conn);
        //     break;
        default:
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
            break;
    }
}

function handleEmployeePromotion($conn, $method) {
    require './controllers/promotion.php';
    if ($method === 'POST') {
        promote($conn);
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
    }
}

function handleLeaveRequest($conn, $method) {
    require './controllers/leave.php';
    if ($method === 'POST') {
        requestLeave($conn);
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
    }
}

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
                http_response_code(404);
                echo json_encode(["message" => "Info type not found"]);
                break;
        }
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
    }
}

switch ($request) {
    case '/api/employees':
        handleEmployees($conn, $method);
        break;
    case '/api/employees/promote':
        handleEmployeePromotion($conn, $method);
        break;
    case '/api/employees/leave/request':
        handleLeaveRequest($conn, $method);
        break;
    case '/api/info/departments':
        handleInfo($conn, $method, 'departments');
        break;
    case '/api/info/locations':
        handleInfo($conn, $method, 'locations');
        break;
    case '/api/info/jobs':
        handleInfo($conn, $method, 'jobs');
        break;
    case '/api/info/offices':
        handleInfo($conn, $method, 'offices');
        break;
    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found"]);
        break;
}
?>