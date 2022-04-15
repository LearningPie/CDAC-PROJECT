import React, { useEffect, useState } from "react";
import Footer from "..//BasicComponents/Footer";
import Usernavbar from "./UserNav";
import axios from "axios";
import ViewGroup from "./ViewGroup";
import cryptoJs from "crypto-js";

function JoinGroup() {
  useEffect(() => {
    document.title = "JoinGroup";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    }
  }, []);

  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }
  let userId = parseInt(doDecryption(sessionStorage.getItem("userId")));

  let [array, setArray] = useState([]);
  useEffect(async () => {
    let response = await axios.get(`http://localhost:8080/getAllGroupsInfo`);
    setArray(response.data);
    console.log(response.data);
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: "url(https://wallpapercave.com/wp/wp7054550.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Usernavbar />

        <div class="container ">
          <div class="row justify-content-center" style={{ height: "160vh" }}>
            <div class="col-md-8">
              <div className="row mb-2 d-flex justify-content-center">
                <span className="text-center fs-2 alert alert-success">
                  Groups List
                </span>
              </div>
              <div
                className="row overflow-auto justify-content-center"
                style={{ height: "120vh" }}
              >
                <div>
                  {array.length > 0 ? (
                    array.map((item) => (
                      <div>
                        <ViewGroup
                          groupName={item.groupName}
                          desc={item.groupDesc}
                          groupId={item.groupId}
                          groupPass={item.groupPassword}
                          admin={item.admin}
                        ></ViewGroup>
                      </div>
                    ))
                  ) : (
                    <h1>No Groups Exists</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default JoinGroup;
