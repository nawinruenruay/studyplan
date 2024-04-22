import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import NotFound from "./page/NotFound";

import Login from "./page/Login";
import Home from "./page/Home";
import Test from "./page/Test";

const Protect = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return element;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Protect element={<Home />} />} />
          <Route path="/home" element={<Protect element={<Home />} />} />
          <Route path="/test" element={<Protect element={<Test />} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
