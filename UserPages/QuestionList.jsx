import React, { useEffect, useState } from "react";
import axios from "axios";
import Usernavbar from "./UserNav";
import { Accordion } from "react-bootstrap";
import Footer from "../BasicComponents/Footer";

function QuestionList() {
  useEffect(() => {
    document.title = "Question List";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    }
    getSubject();
  }, []);
  let [array, setArray] = useState([]);
  let [subject, setSubject] = useState([]);

  const getSubject = () => {
    viewQuestions(sessionStorage.getItem("subject"));
  };

  async function viewQuestions(subject) {
    const response = await axios.get(
      `http://localhost:8080/getAllQuestionsBySubject/${subject}`
    );
    //alert(response.data);
    setArray(response.data);
    setSubject(sessionStorage.getItem("subject"));
  }

  return (
    <div>
      <div>
        <Usernavbar />
      </div>

      <div class="bg-warning">
        <div className="overflow-auto">
          <div class="container ">
            <div className="row justify-content-center ">
              <div
                className="col-md-10 overflow-auto"
                style={{ height: "60rem" }}
              >
                <h1 className=" mb-3 text-center text-white fw-bold">
                  View All {subject} Questions
                </h1>
                <div class="card ">
                  <h5 class="card-header">All Questions</h5>
                  <div className="overflow-auto">
                    <div class="card-body ">
                      <table class="table table-hover table-bordered ">
                        <thead>
                          <tr>
                            <th scope="col">Questions</th>
                          </tr>
                        </thead>
                        <tbody
                          className="overflow-auto"
                          style={{ height: "50vh" }}
                        >
                          {array.length > 0 ? (
                            array.map((item) => (
                              <div>
                                <Accordion defaultActiveKey="0">
                                  <Accordion.Item eventKey="0">
                                    {/* <Accordion.Header>{question.solution}</Accordion.Header> */}
                                    <Accordion.Header>
                                      {item.question}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      {item.answerList.map((item) => (
                                        <div>
                                          <div class="card mb-3">
                                            <div class="row g-0">
                                              <div class="col-md-2 d-flex justify-content-center align-items-center   ">
                                                {/* <img src={Java} height="70px" /> */}
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
                                      ))}
                                      <button className="btn btn-warning">
                                        Answer
                                      </button>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </div>
                            ))
                          ) : (
                            <h2 className="text-center m-5 p-5">
                              No Questions
                            </h2>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default QuestionList;
