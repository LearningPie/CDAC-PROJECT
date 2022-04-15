import cryptoJs from "crypto-js";
import { Link } from "react-router-dom";
import ViewAnswerInGroup from "./ViewAnswerInGroup";

export default function QuestionComp({ question }) {
  function doEncryption(encryptData) {
    let data = cryptoJs.AES.encrypt(
      JSON.stringify(encryptData),
      "my-key"
    ).toString();
    return data;
  }
  let questionId = doEncryption(question.questionId);
  let que = doEncryption(question.question);
  let showQuestion = doEncryption(question.question);
  return (
    <div
      className="alert alert-warning fs-4 "
      style={{
        // borderRadius: "40px",
        width: "1000px",
        // borderTopLeftRadius: "20px",
        // borderBottomLeftRadius: "20px",
        // borderTopRightRadius: "40px",
        // borderBottomRightRadius: "20px",
      }}
    >
      <div className="mb-2"> {question.question}</div>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-warning mx-2"
          onClick={() => {
            sessionStorage.setItem("questionId", questionId);
            sessionStorage.setItem("groupQuestion", que);
            console.log(question.questionId);
            // <ViewAnswerInGroup></ViewAnswerInGroup>;
            window.location = "/viewAnswer";
            // console.log(question.answerList);
          }}
        >
          View Answers
        </button>
        <button
          className="btn btn-warning mx-2"
          onClick={() => {
            sessionStorage.setItem("groupQuestion", showQuestion);
            window.location = "/postAnswerInGroup";
          }}
        >
          Answer
        </button>
      </div>
    </div>
    // <div className="alert alert-primary w-100">{question.question}</div>
  );
}
