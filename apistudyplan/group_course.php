
<?php
header("Access-control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");
include "conn.php";
$sql = "SELECT * from tbl_group_course";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$result=$stmt->fetchAll();
echo json_encode($result);
?>