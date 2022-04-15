import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserNav from "../UserPages/UserNav";
import Footer from "../BasicComponents/Footer";
import GroupBackground from "../Images/GroupBackground.png";
import cryptoJs from "crypto-js";

export default function CreateGroup() {
  const [userId, setUserId] = useState();
  useEffect(() => {
    document.title = "CreateGroup";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    }
    const encryptedId = parseInt(
      doDecryption(sessionStorage.getItem("userId"))
    );
    setUserId(encryptedId);
  }, []);

  let [gName, setGname] = useState("");
  let [gPass, setGpass] = useState("");
  let [gDesc, setGdesc] = useState("");

  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }
  // let userId = doDecryption(sessionStorage.getItem("userId"));

  let group = {
    groupName: gName,
    groupPassword: gPass,
    admin: userId,
    groupDesc: gDesc,
  };

  const create = (group) => {
    axios.post(`http://localhost:8080/createGroup`, group).then(
      (response) => {
        console.log(response.data);
        Swal.fire({
          icon: "Success",
          title: "Congratulations",
          text: "Your group is created",
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oh no!",
          text: "Server is down",
        });
      }
    );
  };

  let [ename, setEname] = useState("");
  let [epass, setEpass] = useState("");

  const validate = () => {
    if (gName.trim() === "" || gPass.trim() === "") {
      Swal.fire("All fields are required");
    } else if (
      gName === "" ||
      gName.search(/^[a-zA-Z0-9 ]*$/) < 0 ||
      gName.length < 3 ||
      gName.length > 15
    ) {
      document.getElementById("Name").classList.add("is-invalid");
      setEname(
        "Please enter characters only and must have length of minimum 3 and maximum 30"
      );
    } else if (
      gPass === "" ||
      gPass.search(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,15}$/) <
        0 ||
      gPass.length < 4
    ) {
      document.getElementById("password").classList.add("is-invalid");
      setEpass(
        "Enter a password with atleast 8 characters and must include 1 capital, 1 number and 1 special character"
      );
    } else {
      create(group);
    }
  };
  return (
    <div>
      <div>
        <UserNav />
      </div>

      <div className="container-fluid mb-4">
        <div className="row align-items-center justify-content-end ">
          <div className="col-md-9">
            <img src={GroupBackground} width="100%" />
          </div>
          <div
            className="col-sm-12 col-md-3 bg-opacity-50  p-4"
            style={{
              borderRadius: "8px",
            }}
          >
            <div className="h2 alert alert-success  text-center">
              Create Group
            </div>
            <form onSubmit={validate}>
              <div className="mb-3">
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  className="form-control form-control-lg"
                  placeholder="Enter the group name"
                  value={gName}
                  onChange={(e) => {
                    setGname(e.target.value);
                  }}
                />
                <div class="invalid-feedback fs-6 fw-bold">{ename}</div>
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter the Group Password"
                  value={gPass}
                  onChange={(e) => {
                    setGpass(e.target.value);
                  }}
                />
                <div class="invalid-feedback fs-6 fw-bold">{epass}</div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  className="form-control form-control-lg"
                  placeholder="Enter the group description here"
                  value={gDesc}
                  onChange={(e) => {
                    setGdesc(e.target.value);
                  }}
                />
                <div class="invalid-feedback fs-6 fw-bold">{ename}</div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn  btn-primary mt-3 ">
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
