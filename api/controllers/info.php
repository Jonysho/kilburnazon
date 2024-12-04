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

function getJobs($conn) {
    header('Content-Type: application/json');
    // error_log("Fetching jobs from the database");
    $sql = "SELECT position_id as id, name FROM job_position";
    $result = $conn->query($sql);

    $jobs = [];
    while ($row = $result->fetch_assoc()) {
        $jobs[] = $row;
    }
    echo json_encode($jobs);
}

function getOffices($conn) {
    header('Content-Type: application/json');
    // error_log("Fetching jobs from the database");
    $sql = "SELECT office_id as id, description as name FROM office";
    $result = $conn->query($sql);

    $office = [];
    while ($row = $result->fetch_assoc()) {
        $office[] = $row;
    }
    echo json_encode($office);
}

function getLocations($conn) {
    header('Content-Type: application/json');
    $sql = "SELECT location, name FROM Office";
    $result = $conn->query($sql);

    $locationsMap = [];
    while ($row = $result->fetch_assoc()) {
        $locationsMap[] = $row;
    }
    $locationsHashMap = [];
    foreach ($locationsMap as $location) {
        $loc = $location['location'];
        $name = $location['name'];
        if (!isset($locationsHashMap[$loc])) {
            $locationsHashMap[$loc] = null;
        }
        $locationsHashMap[$loc] = $name;
    }
    $locationsMap = $locationsHashMap;
    // error_log(print_r($locationsMap, true));
    echo json_encode($locationsMap);
}