import axios from "axios";
import cryptoJs from "crypto-js";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import DataTable from "react-data-table-component";
import UserAvatar from "../UserPages/UserAvatar";

export default function Dataset() {
  useEffect(() => {
    document.title = "ViewQuestions";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    }
  }, []);
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const getQuestions = async () => {
    const response = await axios.get("http://localhost:8080/getAllQuestions");
    setQuestions(response.data);
    setFilteredQuestions(response.data);
    console.log(response.data);
  };

  function doEncryption(encryptData) {
    let data = cryptoJs.AES.encrypt(
      JSON.stringify(encryptData),
      "my-key"
    ).toString();
    return data;
  }

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    const result = questions.filter((que) => {
      return que.question.toLowerCase().match(search.toLowerCase());
    });
    setFilteredQuestions(result);
  }, [search]);

  const column = [
    {
      name: <h5>Questions</h5>,
      selector: (row) => (
        // <div style={{ fontSize: "16px" }}>{row.question}</div>
        <div>
          <Accordion style={{ width: "1200px" }}>
            <Accordion.Item eventKey="0">
              {/* <Accordion.Header>{question.solution}</Accordion.Header> */}
              <Accordion.Header>
                <div className="d-flex justify-content-between align-items-center w-100">
                  {row.question}
                  <button
                    className="btn btn-warning mx-4"
                    onClick={() => {
                      let question = doEncryption(row.question);
                      sessionStorage.setItem("question", question);
                      let questionId = doEncryption(row.questionId);
                      sessionStorage.setItem("questionId", questionId);

                      window.location = "/postAnswer";
                    }}
                  >
                    Answer
                  </button>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {row.answerList.length > 0 ? (
                  row.answerList.map((item) => (
                    <div>
                      <div
                        class="card mb-2 text-light"
                        style={{ backgroundColor: "#3f51b5" }}
                      >
                        <div class="row g-0">
                          <div class="col-md-2 d-flex justify-content-center align-items-center   ">
                            <UserAvatar userName={item.user.name} />
                          </div>
                          <div class="col-md-10">
                            <div class="card-body">
                              <h5 class="card-title">{item.user.userName}</h5>
                              <p class="card-text">{item.answer}</p>
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
      ),

      sortable: true,
    },
    // {
    //   name: <h5>Action</h5>,
    //   cell: (row) => (
    //     <button
    //       className="btn btn-warning btn-sm "
    //       onClick={() => {
    //         window.location = "/postanswer";
    //         sessionStorage.setItem("questionId", row.questionId);
    //         sessionStorage.setItem("question", row.question);
    //       }}
    //     >
    //       Answer
    //     </button>
    //   ),
    // },
    // {
    //   name: <div>Action</div>,
    //   cell: (row) => (
    //     <button
    //       className="btn btn-warning btn-sm "
    //       onClick={() => {
    //         window.location = "/postanswer";
    //         sessionStorage.setItem("questionId", row.questionId);
    //         sessionStorage.setItem("question", row.question);
    //       }}
    //     >
    //       View Answers
    //     </button>
    //   ),
    // },
  ];
  return (
    <>
      <div style={{ height: "100vh" }}>
        {" "}
        <DataTable
          columns={column}
          data={filteredQuestions}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="144vh"
          //selectableRows
          selectableRowsHighlight
          //highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              className="form-control w-50"
              placeholder="Search Question Here...."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          }
          //theme="dark"
          subHeaderAlign="right"
        />
      </div>
    </>
  );
}
