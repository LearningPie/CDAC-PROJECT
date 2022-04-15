import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import Footer from "./FooterAdmin";
import AdminNav from "./AdminNav";
import PieCharts from "./PieChart";

function AdminHome() {
  useEffect(() => {
    document.title = "Admin Home";
    if (sessionStorage.getItem("admin") != "admin") {
      window.location = "/";
    }
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: "url(https://wallpaperaccess.com/full/624980.jpg)",
          height: "100vh",
        }}
      >
        <AdminNav />

        <div style={{ fontSize: "28px" }}>
          <marquee bgcolor="#05254B" behavior="alternate" loop="">
            <div style={{ color: "#98DCD9" }}> WEBSITE ANALYTICS</div>
          </marquee>
        </div>
        <div>
          <PieCharts />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminHome;
