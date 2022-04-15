import axios from "axios";
import cryptoJs from "crypto-js";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserAvatar from "./UserAvatar";

function ViewGroup(groupInfo) {
  // const [userId, setUserId] = useState();
  // const [groupId, setgroupId] = useState();
  // useEffect(() => {
  //   document.title = "ViewGroup";
  //   if (sessionStorage.getItem("user") == null) {
  //     window.location = "/";
  //     // } else {
  //     //   const encryptedId = parseInt(
  //     //     doDecryption(sessionStorage.getItem("userId"))
  //     //   );
  //     //   setUserId(encryptedId);
  //     //   setgroupId(parseInt(doDecryption(sessionStorage.getItem("joingroupId"))));
  //   }
  // }, []);

  function doEncryption(encryptData) {
    let data = cryptoJs.AES.encrypt(
      JSON.stringify(encryptData),
      "my-key"
    ).toString();
    return data;
  }

  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }
  let userId = parseInt(doDecryption(sessionStorage.getItem("userId")));
  // let groupId = parseInt(doDecryption(sessionStorage.getItem("joingroupId")));
  let groupId = groupInfo.groupId;
  // console.log(userId);
  function registerUser() {
    let groupDto = {
      userId: userId,
      groupId: groupId,
    };
    axios.post(`http://localhost:8080/joinGroup`, groupDto).then(
      (response) => {
        console.log(userId);
        if (groupInfo.admin == userId) {
          window.location = "/adminHome";
        } else if (groupInfo.admin != userId) {
          window.location = "/postJoinGroup";
        } else {
          Swal.fire({
            icon: "error",
            title: "Oh no!!!",
          });
        }
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
  }

  function checkPass() {
    var pass = prompt("Please enter group password ", "");
    if (pass == null) {
      Swal.fire("If you dont have a key you cant get in, Please try again");
    } else {
      if (pass === groupInfo.groupPass) {
        registerUser();
      } else {
        Swal.fire("Sorry, please check your password");
      }
    }
  }
  return (
    <>
      <div className="w-100 my-2" style={{ width: "1000px" }}>
        <div
          className=" row justify-content-center align-items-center alert alert-primary"
          style={{ borderRadius: "20px" }}
        >
          <div className="col-md-2 justify-content-center align-items-center d-flex">
            {/* <UserAvatar userName={groupInfo.groupName} /> */}
          </div>

          <div className="col-md-10 ">
            <h5 className="text-align-left">{groupInfo.groupName}</h5>
            <div>{groupInfo.desc}</div>
            <div className="text-align-right d-flex justify-content-end">
              <button
                className="btn btn-warning"
                onClick={() => {
                  let joingroup = doEncryption(groupInfo.groupId);
                  sessionStorage.setItem("joingroupId", joingroup);
                  console.log(joingroup);
                  checkPass();
                }}
              >
                Join Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewGroup;
