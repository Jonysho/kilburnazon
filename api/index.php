<?php
require_once './db/config.php';

$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
// $query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
// parse_str($query, $queryParams);

switch ($request) {
    case '/api/employees':
        require './controllers/employees.php';
        if ($method === 'GET') {
            if (isset($_GET["id"])) {
                getEmployeeById($conn, $_GET['id']);
            } else {
                getEmployees($conn);
            }
        } elseif ($method === 'POST') {
            addEmployee($conn);
        }
        break;

    case '/api/info/departments':
        if ($method === 'GET') {
            require './controllers/info.php';
            getDepartments($conn);
        }
        break;

    case '/api/info/locations':
        if ($method === 'GET') {
            require './controllers/info.php';
            getLocations($conn);
        }
        break;

    case '/api/info/jobs':
        if ($method === 'GET') {
            require './controllers/info.php';
            getJobs($conn);
        }
        break;

    case '/api/info/offices':
        if ($method === 'GET') {
            require './controllers/info.php';
            getOffices($conn);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found"]);
        break;
}
?>