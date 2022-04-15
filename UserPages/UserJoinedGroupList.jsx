import React, { useEffect, useState } from "react";
import Footer from "../BasicComponents/Footer";
import Usernavbar from "./UserNav";
import axios from "axios";
import cryptoJs from "crypto-js";

function UserJoinedGroupsList() {
  // const [userId, setUserId] = useState();
  useEffect(() => {
    document.title = "UserJoinedGroupsList";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    } else if (sessionStorage.getItem("userId") == null) {
      window.location = "/";
    } else {
      let uId = parseInt(doDecryption(sessionStorage.getItem("userId")));
      getData(uId);
      // setUserId(uId);
    }
  }, []);
  let [array, setArray] = useState([]);
  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }
  let userId = parseInt(doDecryption(sessionStorage.getItem("userId")));
  const getData = async (uId) => {
    let response = await axios.get(
      `http://localhost:8080/getAllGroupInfoByUserId/${uId}`
    );
    setArray(response.data);
    console.log(response.data);
  };

  function doEncryption(encryptData) {
    let data = cryptoJs.AES.encrypt(
      JSON.stringify(encryptData),
      "my-key"
    ).toString();
    return data;
  }
  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://wallpapersmug.com/download/3840x2400/fd3838/pattern-stripes-abstract.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Usernavbar />

        <div class="container ">
          <div class="row justify-content-center" style={{ height: "160vh" }}>
            <div class="col-md-8">
              <div className="row mb-2 d-flex justify-content-center">
                <span className="text-center fs-2 alert alert-success">
                  User Joined Groups List
                </span>
              </div>
              <div
                className="row overflow-auto justify-content-center"
                style={{ height: "120vh" }}
              >
                <div>
                  {array.map((item) => (
                    <div className="w-100 my-2" style={{ width: "1000px" }}>
                      {console.log(item)}
                      <div
                        className=" row justify-content-center align-items-center alert alert-primary"
                        style={{ borderRadius: "20px" }}
                      >
                        <div className="col-md-2 justify-content-center align-items-center d-flex">
                          {/* <UserAvatar userName={groupInfo.groupName} /> */}
                        </div>

                        <div className="col-md-10 ">
                          <h5 className="text-align-left">{item.groupName}</h5>
                          <div>{item.groupDesc}</div>
                          <div className="text-align-right d-flex justify-content-end">
                            {console.log(item.admin)}
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                let joingroup = doEncryption(item.groupId);
                                sessionStorage.setItem(
                                  "joingroupId",
                                  joingroup
                                );
                                if (item.admin == userId) {
                                  window.location = "/adminHome";
                                } else {
                                  window.location = "/postJoinGroup";
                                }
                              }}
                            >
                              Go to group
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <ReuseableListDataTable list={array}></ReuseableListDataTable> */}
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
export default UserJoinedGroupsList;
