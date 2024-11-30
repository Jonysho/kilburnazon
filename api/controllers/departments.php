<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
function getDepartmentsAndJobs($conn) {
    header('Content-Type: application/json');
    // error_log("Fetching departments from the database");
    $sql = "SELECT d.name as department, jp.name as job FROM department as d RIGHT JOIN job_position as jp ON d.department_id = jp.department_id";
    $result = $conn->query($sql);

    $departmentJobsMap = [];
    foreach ($result as $department) {
        $deptName = $department['department'];
        $jobName = $department['job'];
        if (!isset($departmentJobsMap[$deptName])) {
            $departmentJobsMap[$deptName] = [];
        }
        $departmentJobsMap[$deptName][] = $jobName;
    }
    echo json_encode($departmentJobsMap);
}

// add department
