<?php
require_once './db/config.php';

$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

switch ($request) {
    case '/api/employees':
        if ($method === 'GET') {
            require './controllers/employees.php';
            getEmployeesData($conn);
        } elseif ($method === 'POST') {
            require './controllers/employees.php';
            addEmployee($conn);
        }
        break;

    case '/api/departments':
        if ($method === 'GET') {
            require './controllers/departments.php';
            getDepartmentsAndJobs($conn);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found"]);
        break;
}
?>