<?php
header("Access-control-Allow-Origin:*");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

include "conn.php";

$REQUEST_METHOD = $_SERVER["REQUEST_METHOD"];

if ($REQUEST_METHOD == "DELETE") {
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $sql = "DELETE FROM tbl_plan WHERE id = '$id'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
}
?>