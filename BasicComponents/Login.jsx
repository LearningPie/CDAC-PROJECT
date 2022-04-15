import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
import Mainnavbar from "../BasicComponents/Mainnavbar";
import "../../CSS/bgimg.css";
import LoginBackground from "../Images/Login.jpg";
import { Swal } from "sweetalert2";
import cryptoJs from "crypto-js";
import Refresh from "../Images/refresh.jpeg";

export default function Login() {
  useEffect(() => {
    document.title = "Login";
    generateCaptch();
  }, []);

  let [userName, setUsername] = useState("");
  let [upassword, setUpassword] = useState("");
  // let [callCaptcha, setCallCaptch] = useState("");
  const [checkCaptcha, setCheckCaptcha] = useState("");
  let c = "";
  const [captcha, setCaptcha] = useState("");
  const generateCaptch = () => {
    let s = "abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 5; i++) {
      let s1 = s.charAt(Math.random() * s.length);
      c = c + s1;
    }
    console.log(c);
    setCaptcha(c);
  };

  // setCallCaptch(generateCaptch());
  let user = {
    userName: userName,
    password: upassword,
  };

  function doEncryption(encryptData) {
    let data = cryptoJs.AES.encrypt(
      JSON.stringify(encryptData),
      "my-key"
    ).toString();
    return data;
  }
  //Login check method
  const checkLogin = (data) => {
    axios.post(`http://localhost:8080/login`, data).then(
      (response) => {
        if (response.data.length == 0) {
          swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Credentials Entered or you have not registered yet.",
          });
        } else {
          if (response.data.status == true) {
            sessionStorage.setItem("admin", "admin");
            let encryptedId = doEncryption(response.data.userId);
            sessionStorage.setItem("adminId", encryptedId);
            let encryptedUserName = doEncryption(response.data.userName);
            sessionStorage.setItem("adminSession", encryptedUserName);
            let encryptedName = doEncryption(response.data.name);
            sessionStorage.setItem("name", encryptedName);
            window.location = "/admin";
          } else {
            sessionStorage.setItem("user", "user");
            let encryptedId = doEncryption(response.data.userId);
            sessionStorage.setItem("userId", encryptedId);
            let encryptedUserName = doEncryption(response.data.userName);
            sessionStorage.setItem("userSession", encryptedUserName);
            let encryptedName = doEncryption(response.data.name);
            sessionStorage.setItem("name", encryptedName);
            window.location = "/user";
          }
        }
      },
      (error) => {
        console.log(error);
        swal.fire({
          icon: "error",
          title: "Oh no!",
          text: "Server is down",
        });
      }
    );
  };
  const [uname, setUname] = useState("");
  const [uans, setUans] = useState("");
  const [upass, setUpass] = useState("");

  const validate = (e) => {
    if (userName === "" || upassword === "" || checkCaptcha === "") {
      Swal.fire("All fields are required");
    } else if (userName === "" || userName.search(/^[a-zA-Z0-9 ]*$/) < 0) {
      document.getElementById("uName").classList.add("is-invalid");
      setUname(
        "Please enter characters only and must have length of minimum 3 and maximum 30"
      );
    } else if (
      upassword === "" ||
      upassword.search(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
      ) < 0 ||
      upassword.length < 6
    ) {
      document.getElementById("password").classList.add("is-invalid");
      setUpass(
        "Enter a password with atleast 8 characters and must include 1 capital, 1 number and 1 special character"
      );
    } else if (checkCaptcha != captcha) {
      document.getElementById("securityAns").classList.add("is-invalid");
      setUans("Enter Correct Captcha");
    } else {
      checkLogin(user);
      // e.preventDefault();
    }
  };
  return (
    <div style={{ background: "#D4D8E1" }}>
      <Mainnavbar />

      <div
        className="container-fluid"
        //         style={{
        //           backgroundImage: `url(https://www.rtor.org/wp-content/uploads/2021/04/rtor_guest-blog_featured-image_Why-You-Should-Be-Journaling-on-Your-Lunch-Break-and-Why-Bullet-Journals-Are-the-Way-to-Go-768x576.jpg
        // )`,
        //           backgroundRepeat: "no-repeat",
        //         }}
      >
        <div className="row align-items-center justify-content-end ">
          <div className="col-md-9 m-0">
            <img src={LoginBackground} height="700px" width="100%" />
          </div>
          <div
            className="col-12 col-md-3 bg-opacity-50 bg-light  p-4"
            style={{ borderRadius: "8px" }}
          >
            <div className="h2 alert alert-success  text-center">Login</div>
            <form onSubmit={validate}>
              <div className="mb-3">
                <input
                  type="text"
                  id="uName"
                  name="uName"
                  className="form-control form-control-lg"
                  placeholder="Enter the user name"
                  value={userName}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <div className="invalid-feedback fs-6 fw-bold">{uname}</div>
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter the Password"
                  value={upassword}
                  onChange={(e) => {
                    setUpassword(e.target.value);
                  }}
                />
                <div className="invalid-feedback fs-6 fw-bold">{upass}</div>
              </div>
              <div className="text-center d-flex justify-content-center align-items-center mb-2">
                <span
                  id="securityAns"
                  className="fs-4 p-1"
                  style={{ backgroundColor: "#98CCFE" }}
                >
                  <strike>{captcha}</strike>
                </span>
                <span className="p-2">
                  <button onClick={generateCaptch}>
                    <img src={Refresh} height="35px"></img>
                  </button>
                </span>
                <div className="invalid-feedback fs-6 fw-bold">{uans}</div>
              </div>
              <div>
                <input
                  type="text"
                  id="captcha"
                  className="form-control form-control-lg"
                  placeholder="Enter captcha here"
                  onChange={(e) => {
                    setCheckCaptcha(e.target.value);
                  }}
                />
              </div>
              <div class="col-md-12 mt-3 text-center">
                <Link to="/forgotPassword" class="text-decoration-none  ">
                  Forgot password?
                </Link>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn  btn-primary mt-3 ">
                  Login
                </button>
              </div>

              <div className="text-center mt-3">
                <div className="">
                  Not Registered??
                  <Link to="/register" className="text-primary ">
                    Register Here...
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
