<?php 
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8"); 

include "conn.php";

$REQUEST_METHOD = $_SERVER["REQUEST_METHOD"];

if ($REQUEST_METHOD == "POST") {
    $data = json_decode(file_get_contents("php://input"));
    $year = $data->year;
    $group_id = $data->group_id;
    $course_id = $data->course_id;
    $course_name = $data->course_name;
    $unit = $data->unit;
    
    $sql = "SELECT MAX(id) AS maxid FROM tbl_plan";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll();
    if (isset($result[0]['maxid'])) {
        $id = $result[0]['maxid'] + 1;
    } else {
        $id = 1;
    }
    
    $sql = "INSERT INTO tbl_plan (id, year, group_id, course_id, course_name, unit) 
            VALUES ('$id', '$year', '$group_id', '$course_id', '$course_name', '$unit')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
}
?>