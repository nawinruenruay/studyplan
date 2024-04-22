<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include "conn.php";
$sql = "SELECT tbl_plan.*, SUBSTRING(group_name,3) AS group_name FROM tbl_plan
        LEFT JOIN tbl_group_course ON tbl_plan.group_id = tbl_group_course.group_id";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll();
echo json_encode($result);
?>
