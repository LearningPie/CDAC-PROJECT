import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import Usernavbar from "./UserNav";
import Footer from "../BasicComponents/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import cryptoJs from "crypto-js";

function PostAnswer() {
  // const [userId, setUserId] = useState();
  // const [queId, setqueId] = useState();
  // const [question, setquestion] = useState();
  useEffect(() => {
    document.title = "PostAnswer";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    } else if (
      sessionStorage.getItem("userId") == null &&
      sessionStorage.getItem("questionId") == null &&
      sessionStorage.getItem("groupQuestion") == null
    ) {
      window.location = "/";
    } else {
      // const encryptedId = parseInt(
      //   doDecryption(sessionStorage.getItem("userId"))
      // );
      // setUserId(encryptedId);
      // const qid = parseInt(doDecryption(sessionStorage.getItem("questionId")));
      // setqueId(qid);
      // const q = doDecryption(sessionStorage.getItem("groupQuestion"));
      // setquestion(q);
    }
  }, []);

  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }

  let encryptedQuestionId = sessionStorage.getItem("questionId");
  let queId = doDecryption(encryptedQuestionId);
  let encryptedUserId = sessionStorage.getItem("userId");
  let userId = doDecryption(encryptedUserId);
  let question = doDecryption(sessionStorage.getItem("question"));

  let [ans, setAns] = useState("");
  let Answer = {
    answer: ans,
    questionId: queId,
    userId: userId,
  };
  let giveAnswer = (e) => setAns(e.target.value);

  const Submit = (Answer) => {
    axios.post(`http://localhost:8080/postAnswer`, Answer).then(
      (response) => {
        console.log(response.data);
        Swal.fire({
          icon: "Success",
          title: "Congratulations",
          text: "Your Answer is posted",
        });

        window.location = "/viewQuestion";
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

  const validate = () => {
    if (ans.trim() === "") {
      Swal.fire("All fields are required");
    } else {
      Submit(Answer);
    }
  };
  return (
    <>
      <div>
        <div>
          <Usernavbar />
        </div>

        <div>
          <Row
            className="Container justify-content-center "
            style={{ height: "100vh", width: "100%" }}
          >
            <div className="col-md-10">
              <h4 className="alert alert-info ">{question}</h4>
              <Form onSubmit={validate}>
                <Form.Group
                  className="mb-3 shadow"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Write your answer here......"
                    rows={15}
                    value={ans}
                    name="question"
                    onChange={giveAnswer}
                  />
                </Form.Group>

                <div className="d-flex justify-content-start">
                  <span>
                    <button className="btn btn-primary">SUBMIT</button>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>
                    <button className="btn btn-danger">CLEAR</button>
                  </span>
                </div>
              </Form>
            </div>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostAnswer;
