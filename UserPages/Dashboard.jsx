import React, { useEffect, useState } from "react";
import Footer from "../BasicComponents/Footer";
import Usernavbar from "../UserPages/UserNav";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import cryptoJs from "crypto-js";

function Dashboard() {
  // const [userId, setUserId] = useState();
  useEffect(() => {
    document.title = "Dashboard";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    } else if (sessionStorage.getItem("userId") == null) {
      window.location = "/";
    } else {
      let uId = parseInt(doDecryption(sessionStorage.getItem("userId")));
      getData(uId);
    }
  }, []);
  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }
  function doEncryption(encryptData) {
    let data = cryptoJs.AES.encrypt(
      JSON.stringify(encryptData),
      "my-key"
    ).toString();
    return data;
  }
  let [array, setArray] = useState([]);
  const getData = async (uId) => {
    let response = await axios.get(
      `http://localhost:8080/getAllQuestionsByUser/${uId}`
    );
    setArray(response.data);
    console.log(response.data);
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://www.itl.cat/pngfile/big/187-1872750_abstract-bright-blue-geometric-shape-navy-blue-abstract.jpg )",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Usernavbar />

        <div class="fluid-container ">
          <div class="row" style={{ height: "160vh" }}>
            <div class="col-md-2 "></div>
            <div class="col-md-8">
              <h1 className="text-center">
                <div className="alert alert-warning">Dashboard</div>
              </h1>
              <div className="row overflow-auto" style={{ height: "120vh" }}>
                <div>
                  {array.length > 0 ? (
                    array.map((item) => (
                      <div>
                        <Accordion>
                          <Accordion.Item eventKey="0">
                            {/* <Accordion.Header>{question.solution}</Accordion.Header> */}
                            <Accordion.Header>
                              <div className="d-flex justify-content-between align-items-center w-100">
                                {item.question}
                                <button
                                  className="btn btn-warning mx-4"
                                  onClick={() => {
                                    let question = doEncryption(item.question);
                                    sessionStorage.setItem(
                                      "question",
                                      question
                                    );
                                    let questionId = doEncryption(
                                      item.questionId
                                    );
                                    sessionStorage.setItem(
                                      "questionId",
                                      questionId
                                    );

                                    window.location = "/postAnswer";
                                  }}
                                >
                                  Answer
                                </button>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              {item.answerList.length > 0 ? (
                                item.answerList.map((item) => (
                                  <div>
                                    <div class="card mb-3">
                                      <div class="row g-0">
                                        <div class="col-md-2 d-flex justify-content-center align-items-center   ">
                                          {/* <UserAvatar name={item.user.userName} /> */}
                                        </div>
                                        <div class="col-md-10">
                                          <div class="card-body">
                                            <h5 class="card-title">
                                              {item.user.userName}
                                            </h5>
                                            <p class="card-text">
                                              {item.answer}
                                            </p>
                                            <p class="card-text">
                                              {/* <button className="btn btn-primary">
                                          Like
                                        </button>
                                        &nbsp;{" "}
                                        <button className="btn btn-primary">
                                          Dislike
                                        </button> */}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div>No Answers Yet</div>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    ))
                  ) : (
                    <div className="row">
                      <h2 className="text-center mt-5">
                        Not Posted Any Question Yet....
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="col-md-2 "></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Dashboard;
