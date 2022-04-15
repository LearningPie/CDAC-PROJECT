import React, { useEffect, useState } from "react";
import Cards from "../BasicComponents/Cards";
import UserNav from "./UserNav";
import Footer from "../BasicComponents/Footer";
import Matrix from "../Images/Matrix.mp4";

function UserHome() {
  useEffect(() => {
    document.title = "UserHome";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    }
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <div style={{ background: "#CBC7FC" }}>
          <div>
            <UserNav />
          </div>

          <div>
            <div className="fluid-Container">
              <div>
                <div className="row ">
                  <video
                    autoPlay
                    loop
                    muted
                    style={{
                      position: "absolute",
                      width: "100%",
                      left: "50%",
                      top: "50%",
                      height: "100%",
                      objectfit: "cover",
                      transform: "translate(-50%, -50%)",

                      //zIndex: "-1",
                      //display: "flex",
                      alignItems: "stretch",
                    }}
                  >
                    <source src={Matrix} type="video/mp4" />
                  </video>
                </div>
                <div style={{ height: "90vh" }}>
                  <div style={{ height: "50%", textAlign: "center" }}>
                    <div className="row d-flex justify-content-end">
                      <div className="col-md-3">
                        {/* <InputGroup className="mt-5">
                          <FormControl
                            placeholder="Search Your Question Here.."
                            aria-label="Search Your Question Here.."
                            aria-describedby="basic-addon2"
                          />
                          <Button
                            className="bg-dark text-light"
                            variant="outline-secondary"
                            id="button-addon2"
                          >
                            Search
                          </Button>
                        </InputGroup> */}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      left: "42%",
                      top: "50%",
                    }}
                  >
                    <span>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          window.location = "/createGroup";
                        }}
                      >
                        CREATE GROUP
                      </button>
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          window.location = "/joinGroup";
                        }}
                      >
                        JOIN GROUP
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="">
                <h1 className="text-center text-dark mt-4 ">Question Banks</h1>
                <div className="container mt-4">
                  <div className="row ">
                    <div className="col-md-3">
                      <Cards
                        title="Core Java"
                        link="View Questions"
                        href="/questionBank"
                        subject="Java"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="Adv Java"
                        link="View Questions "
                        href="/questionBank"
                        subject="AdvJava"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="OS"
                        link="View Questions"
                        href="/questionBank"
                        subject="OS"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="Database"
                        link="View Questions"
                        href="/questionBank"
                        subject="Database"
                      ></Cards>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-3">
                      <Cards
                        title="React JS"
                        link="View Questions"
                        href="/questionBank"
                        subject="Reactjs"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="WPT"
                        link="View Questions"
                        href="/questionBank"
                        subject="WPT"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="ADS"
                        link="View Questions"
                        href="/questionBank"
                        subject="ADS"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="C++"
                        link="View Questions"
                        href="/questionBank"
                        subject="C++"
                      ></Cards>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-3">
                      <Cards
                        title="Dot Net"
                        link="View Questions"
                        href="/questionBank"
                        subject="DotNet"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="Python"
                        link="View Questions"
                        href="/questionBank"
                        subject="Python"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="JS"
                        link="View Questions"
                        href="/questionBank"
                        subject="JS"
                      ></Cards>
                    </div>
                    <div className="col-md-3">
                      <Cards
                        title="Swift"
                        link="View Questions"
                        href="/questionBank"
                        subject="Swift"
                      ></Cards>
                    </div>
                  </div>
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

export default UserHome;

//render(<Example />);
