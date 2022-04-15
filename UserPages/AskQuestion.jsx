import React, { useEffect, useState } from "react";
import Footer from "../BasicComponents/Footer";
import Usernavbar from "../UserPages/UserNav";
import axios from "axios";
import Datatable from "./Datatable";

function AskQuestion() {
  useEffect(() => {
    document.title = "AskQuestion";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    }
  }, []);
  let [array, setArray] = useState([]);
  useEffect(async () => {
    let response = await axios.get(`http://localhost:8080/getAllQuestions`);
    setArray(response.data);
    console.log(response.data);
  }, []);
  return (
    <>
      <div
        style={{
          height: "160vh",
          backgroundImage: `url(https://eventage.net/wp-content/uploads/2018/06/Question-Mark-Background-01.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Usernavbar />

        <div class="fluid-container ">
          <div class="row" style={{ height: "120vh" }}>
            <div class="col-md-1 "></div>
            <div class="col-md-10">
              <Datatable />
            </div>
            <div class="col-md-1 "></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default AskQuestion;
