<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getBirthdayEmployees($conn) {
    // SQL query to get employees with birthdays in the current month
    $sql = "SELECT name, dob FROM employee WHERE MONTH(dob) = MONTH(CURRENT_DATE()) ORDER BY DAY(dob)";
    $result = $conn->query($sql);

    // Initialize an array to store employee data
    $birthdayEmployees = [];

    if ($result && $result->num_rows > 0) {
        // Fetch rows from the result set
        while ($row = $result->fetch_assoc()) {
            // Append each row to the array
            $birthdayEmployees[] = $row;
        }
    }
    // Return the JSON-encoded result
    echo json_encode($birthdayEmployees);
}
