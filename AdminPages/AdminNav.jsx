import cryptoJs from "crypto-js";
import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../Images/logo.png";
import UserAvatar from "../UserPages/UserAvatar";

function AdminNav() {
  const [name, setName] = useState("");
  useEffect(() => {
    document.title = "Admin Home";
    if (sessionStorage.getItem("admin") != "admin") {
      window.location = "/";
    } else {
      const encryptedName = sessionStorage.getItem("name");
      setName(doDecryption(encryptedName));
    }
  }, []);
  useEffect(() => {}, []);
  const logoutAdmin = () => {
    sessionStorage.removeItem("adminSession");
    sessionStorage.removeItem("adminId");
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("name");
    window.location = "/";
  };
  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }

  return (
    <div>
      <div className="sticky-top">
        <Navbar
          expand="lg"
          style={{
            backgroundImage: "url(https://wallpaperaccess.com/full/676347.jpg)",
          }}
        >
          <Navbar.Brand id="textcolor" className="fw-bold" href="/admin">
            <img src={logo} height="44vh" className="mx-4" />
          </Navbar.Brand>
          <div className="ps-3 pe-5 text-center">
            <div className="text-white ">
              Welcome <br />
              <span>{name}</span>
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-bold align-items-center">
              <Nav.Link classname="p-2" href="/adminViewQuestion">
                View Questions
              </Nav.Link>
              <Nav.Link id="textcolor" href="/userList">
                View Users
              </Nav.Link>
              <Nav.Link className="text-light" href="/adminProfile">
                <UserAvatar userName={name} />
              </Nav.Link>
              <Nav.Link id="textcolor" href="/">
                <form onSubmit={logoutAdmin} action="/">
                  <button type="submit" class="btn btn-sm btn-danger">
                    <span className="fs-6 ">LOGOUT</span>
                  </button>
                </form>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default AdminNav;
