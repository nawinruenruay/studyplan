import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/login.css";

import { IconUser, IconLock } from "@tabler/icons-react";

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/apistudyplan/login.php",
        {
          username: Username,
          password: Password,
        }
      );
      // console.log(response.data);
      // localStorage.setItem("token", "abc");
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.response.data.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "red",
      });
      setUsername("");
      setPassword("");
    }
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (Username === "admin" && Password === "12345") {
  //     localStorage.setItem("token", "abc");
  //     navigate("/home");
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "เกิดข้อผิดพลาด",
  //       text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
  //       confirmButtonText: "ตกลง",
  //       confirmButtonColor: "red",
  //     });
  //     setUsername("");
  //     setPassword("");
  //   }
  // };

  return (
    <>
      <div className="screen">
        <div className="loginBx">
          <div className="right-bx">
            <div className="content-login">
              <div className="logo">
                <img src="/src/assets/img/logo.png" alt="kpru" />{" "}
              </div>
              {/* <h2>ระบบจัดการแผนการเรียน</h2> */}
              <br />
              <form onSubmit={handleLogin}>
                <div className="login-Input">
                  <div className="inputBx">
                    <i className="input-icon">
                      {" "}
                      <IconUser />
                    </i>
                    <input
                      className="input-login"
                      type="text"
                      placeholder="ชื่อผู้ใช้"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="inputBx">
                    <i className="input-icon">
                      {" "}
                      <IconLock />
                    </i>
                    <input
                      className="input-login"
                      type="password"
                      name="password"
                      placeholder="รหัสผ่านผู้ใช้"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="btn-submit">
                    <button type="submit" className="admin-loginBtn">
                      เข้าสู่ระบบ
                    </button>
                  </div>
                </div>
              </form>
              <br />
              {/* <h5 style={{ fontSize: "15px" }}>คู่มือการใช้งานระบบ</h5>
              <h5 style={{ fontSize: "15px", marginTop: "5px" }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
                aperiam?
              </h5> */}
            </div>
          </div>
          <div className="left-bx">
            <div className="content-login"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
