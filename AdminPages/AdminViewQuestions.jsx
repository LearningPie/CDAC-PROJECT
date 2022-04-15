import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import AdminNav from "./AdminNav";
import Footer from "../BasicComponents/Footer";

export default function AdminViewQuestions() {
  useEffect(() => {
    document.title = "ViewQuestions";
    if (sessionStorage.getItem("admin") == null) {
      window.location = "/";
    }
  }, []);
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  let deletedRows = [{}];

  const printRowDeleted = () => {
    console.log(deletedRows);
    let deletedRowsList = [];
    deletedRows.map((item) => {
      // console.log(item.questionId);
      deletedRowsList.push(item.questionId);
    });

    deleteFunction(deletedRowsList);
    console.log(deletedRowsList);
  };
  const deleteFunction = async (data) => {
    const response = await axios.post(
      `http://localhost:8080/deleteQuestions`,
      data
    );
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        printRowDeleted();
        Swal.fire("Deleted!", "User has been Deleted", "success").then(
          function () {
            window.location = "/adminViewQuestion";
          }
        );
      }
    });
  };
  const getQuestions = async () => {
    const response = await axios.get("http://localhost:8080/getAllQuestions");
    setQuestions(response.data);
    setFilteredQuestions(response.data);
    console.log(response.data);
  };

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
      name: <div>Questions</div>,
      selector: (row) => <div>{row.question}</div>,

      sortable: true,
    },
  ];
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://images3.alphacoders.com/227/227335.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <AdminNav />
        <div
          className="mt-5 container overflow-auto"
          style={{ height: "110vh" }}
        >
          <DataTable
            title="Questions"
            columns={column}
            data={filteredQuestions}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="144vh"
            selectableRows
            selectableRowsHighlight
            onSelectedRowsChange={(state) => {
              deletedRows = state.selectedRows;
            }}
            subHeader
            subHeaderComponent={
              <input
                className="form-control w-25"
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
          <div>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
