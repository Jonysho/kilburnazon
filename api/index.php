<?php
require_once './db/config.php';

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($request) {
    case '/employees' && $method === 'GET':
        require './controllers/employee.php';
        getEmployees($conn);
        break;

    case '/employees' && $method === 'POST':
        require './controllers/employee.php';
        addEmployee($conn);
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint not found"]);
        break;
}
?>
