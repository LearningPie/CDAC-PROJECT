import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import UserNav from "../UserPages/UserNav";
import Footer from "../BasicComponents/Footer";
import cryptoJs from "crypto-js";

export default function ViewAnswerInGroup(prop) {
  // const [questionId, setquestionId] = useState();
  // const [groupQuestion, setgroupQuestion] = useState("");
  useEffect(() => {
    document.title = "ViewAnswerInGroup";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    } else if (
      sessionStorage.getItem("questionId") == null &&
      sessionStorage.getItem("groupQuestion") == null
    ) {
      window.location = "/";
    } else {
      let qId = parseInt(doDecryption(sessionStorage.getItem("questionId")));
      // setquestionId(qId);
      let gque = doDecryption(sessionStorage.getItem("groupQuestion"));
      // setgroupQuestion(gque);
      getData(qId);
    }
  }, []);
  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }
  let questionId = parseInt(doDecryption(sessionStorage.getItem("questionId")));
  let groupQuestion = doDecryption(sessionStorage.getItem("groupQuestion"));
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataList, setFilteredDataList] = useState([]);
  // useEffect(async () => {
  //   setFilteredDataList(prop.list);
  //   setDataList(prop.list);
  // }, []);
  //   useEffect(() => {
  //     const result = dataList.filter((que) => {
  //       return que.question.toLowerCase().match(search.toLowerCase());
  //     });
  //     setFilteredDataList(result);
  //   }, [search]);

  const getData = async (qId) => {
    // console.log(sessionStorage.getItem("questionId"));
    // console.log(questionId);

    let response = await axios.get(
      `http://localhost:8080/getAnswersByQuestionsId/${qId}`
    );
    console.log(response.data);
    setDataList(response.data);
    setFilteredDataList(response.data);
  };

  const column = [
    {
      name: <h4>Answers</h4>,

      selector: (row) => <h6>{row.answer}</h6>,

      sortable: true,
    },
    {
      name: <h4>User</h4>,

      selector: (row) => <h6>{row.user.userName}</h6>,

      sortable: true,
    },
  ];
  return (
    <div>
      <UserNav />

      <div style={{ height: "120vh" }} className="overflow-auto container mt-5">
        <button
          className="btn btn-warning mb-1"
          onClick={() => (window.location = "/postJoinGroup")}
        >
          Back to Group
        </button>

        <h4 className="alert alert-primary">
          Question&nbsp;:&nbsp;
          {groupQuestion}
        </h4>
        <DataTable
          columns={column}
          data={filteredDataList}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="144vh"
          //selectableRows
          selectableRowsHighlight
          highlightOnHover
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
      <Footer></Footer>
    </div>
  );
}
