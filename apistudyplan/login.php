<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include "conn.php";
include "vendor/autoload.php"; 

use Firebase\JWT\JWT;

$REQUEST_METHOD = $_SERVER["REQUEST_METHOD"];

if ($REQUEST_METHOD == "POST") {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->username) && !empty($data->password)) {
        $username = $data->username;
        $password = $data->password;

        $sql = "SELECT * FROM tbl_users WHERE username = '$username'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $user = $stmt->fetch();

        if ($user) {
            if (password_verify($password, $user['password'])) {
                $secret_key = "mysecret"; 
                $issuer_claim = "test";
                $issuedat_claim = time();
                $expire_claim = $issuedat_claim + 3600;
                $token = array(
                    "iss" => $issuer_claim,
                    "iat" => $issuedat_claim,
                    "exp" => $expire_claim,
                    "data" => array(
                        "username" => $user['username']
                    )
                );
                $jwt = JWT::encode($token, $secret_key , 'HS256');
                http_response_code(200);
                echo json_encode(array("message" => "เข้าสู่ระบบสำเร็จ", "token" => $jwt));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "รหัสผ่านไม่ถูกต้อง"));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "ไม่พบผู้ใช้ในระบบ"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน"));
    }
}
?>
