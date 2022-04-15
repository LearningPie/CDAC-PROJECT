import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import swal from "sweetalert2";
import UserNav from "./UserNav";
import base_url from "../API/BootAPI";
import Footer from "../BasicComponents/Footer";
import cryptoJs from "crypto-js";

function PostQuestion() {
  const [userId, setUserId] = useState();
  useEffect(() => {
    document.title = "PostQuestion";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    } else {
      const encryptedId = parseInt(
        doDecryption(sessionStorage.getItem("userId"))
      );
      setUserId(encryptedId);
    }
  }, []);

  let [que, setQue] = useState("");
  let [sub, setSub] = useState("");

  function doDecryption(encryptedData) {
    let decryptedId = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedId.toString(cryptoJs.enc.Utf8));
  }
  // let encryptedUserId = sessionStorage.getItem("userId");
  // let userId = doDecryption(encryptedUserId);

  let Question = {
    question: que,
    subject: sub,
    user: { userId: userId },
  };

  let setQuestion = (e) => setQue(e.target.value);
  let setSubject = (e) => setSub(e.target.value);

  const submit = (Question) => {
    axios.post(`${base_url}/postQuestion`, Question).then(
      (response) => {
        console.log(response.data);
        swal.fire({
          icon: "Success",
          title: "Congratulations",
          text: "Your question is posted",
        });
        window.location = "/viewQuestion";
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
    window.location = "/viewQuestion";
  };

  let [eque, setEque] = useState("");

  const validate = () => {
    if (que.trim() === "" || sub.trim() === "") {
      swal.fire("All fields are required");
    } else if (que.search(/^[a-zA-Z?=. ]*$/) < 0) {
      document.getElementById("que").classList.add("is-invalid");
      setEque("Enter a valid question");
    } else {
      submit(Question);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://insight.ieeeusa.org/wp-content/uploads/sites/3/2019/01/presentations-1200-1200x700.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain, cover",
        }}
      >
        <div>
          <UserNav />
        </div>

        <div>
          <Row className="Container" style={{ height: "100vh", width: "100%" }}>
            <div className="row justify-content-center">
              <div className="col-md-8   ">
                <h4 className="alert alert-info ">Post Your Question Here</h4>
                <Form onSubmit={validate}>
                  <Form.Group
                    className="mb-3 shadow"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      id="que"
                      placeholder="Write your question here......"
                      rows={15}
                      value={que}
                      name="question"
                      onChange={setQuestion}
                    />
                    <div class="invalid-feedback fs-6 fw-bold">{eque}</div>
                  </Form.Group>
                  <span>
                    <div className="d-flex justify-content-start mb-2">
                      <select
                        id="sub"
                        class="form-select "
                        style={{ width: 200 }}
                        name="subject"
                        value={sub}
                        onChange={setSubject}
                        required
                      >
                        <option>Select Subject</option>
                        <option value="Java">Java</option>
                        <option value="ADS">ADS</option>
                        <option value="Reactjs">Reactjs</option>
                        <option value="Database">Database</option>
                        <option value="JS">JavaScript</option>
                        <option value="AdvJava">Adv Java</option>
                        <option value="OS">OS</option>
                        <option value="WPT">WPT</option>
                        <option value="C++">C++</option>
                        <option value="DotNet">Dot Net</option>
                        <option value="Python">Python</option>
                        <option value="Swift">Swift</option>
                      </select>
                      <div class="invalid-feedback fs-6 fw-bold">{}</div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        <button className="btn btn-success">SUBMIT</button>
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        <button className="btn btn-danger">CANCEL</button>
                      </span>
                    </div>
                  </span>
                </Form>
              </div>
            </div>
          </Row>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default PostQuestion;
