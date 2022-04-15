import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import base_url from "../API/BootAPI";
import Footer from "../BasicComponents/Footer";
import "../../CSS/AdminProfile.css";
import AdminNav from "./AdminNav";
import cryptoJs from "crypto-js";

function AdminProfile() {
  const [userName, setUserName] = useState();
  useEffect(() => {
    document.title = "AdminProfile";
    if (sessionStorage.getItem("admin") == null) {
      window.location = "/";
    } else {
      const encryptedUserName = sessionStorage.getItem("adminSession");
      let uName = doDecryption(encryptedUserName);
      if (uName == undefined) {
        window.location = "/";
      }
      userProfile(uName);
    }
   
  }, []);

  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }
  // let encryptedUserName = sessionStorage.getItem("adminSession");
  // let userName = doDecryption(encryptedUserName);

  const userProfile = (uName) => {
    axios.post(`${base_url}/getuser/${uName}`).then(
      (response) => {
        if (response.data.length == 0) {
          swal.fire({
            title: "User",
            text: "There are no users registered",
            icon: "error",
            button: "Ok",
          });
        }
        setUsers(response.data);
      },
      (error) => {
        console.log(error);
        swal.fire("Server is down");
      }
    );
  };

  const [users, setUsers] = useState([]);
  let profilePic = "./Uploaded/ProfilePic/" + users.profilePicName;
  console.log(users);
  return (
    <div style={{ backgroundColor: "#4A5981" }}>
      <div className="">
        <div>
          <AdminNav />
        </div>

        <div>
          <div class="container profile-page">
            <div
              class="row justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <div class="col-xl-7 col-lg-8 col-md-12">
                <div
                  class="card profile-header "
                  style={{
                    backgroundColor: "#FEE3CD",
                    backgroundImage:
                      "linear-gradient(to left, #FEE3CD, #ADD8E6)",
                  }}
                >
                  <div class="body">
                    <h3 className=" p-2 mt-0 font-weight-bold ">
                      <b>MY PROFILE</b>
                    </h3>
                    <hr />
                    <div class="row">
                      <div class="col-lg-4 col-md-4 col-12">
                        <div class="profile-image float-md-right">
                          <img src={profilePic} />
                        </div>
                      </div>
                      <div class="col-lg-8 col-md-8 col-12">
                        <div className="font-weight-bold p-2 fs-4 fw-bold mt-1 mb-1">
                          UserName : {users.userName}
                        </div>
                        <hr className="bg-primary" />
                        <div className="font-weight-bold p-2 fs-4 fw-bold">
                          Name : {users.name}
                        </div>
                        <hr className="bg-primary" />
                        <h3 className="font-weight-bold p-2 fs-4 fw-bold">
                          Email ID : {users.email}
                        </h3>
                        <hr className="bg-primary" />
                        <h3 className="font-weight-bold p-2 fs-4 fw-bold">
                          Phone : {users.phoneNo}
                        </h3>
                        <div className="col-sm-12 d-flex justify-content-end">
                          <Link to="/adminUpdateProfile">
                            <button className="btn btn-lg btn-primary form-control">
                              Edit
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminProfile;
