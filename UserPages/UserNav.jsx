import { Nav, Navbar } from "react-bootstrap";
import logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import Sidebar from "../BasicComponents/Sidebar";
import NavbarBackground from "../Images/footer.jpg";
import cryptoJs from "crypto-js";
import { useEffect, useState } from "react";

export default function Usernavbar() {
  const [name, setName] = useState("");
  useEffect(() => {
    document.title = "UserHome";
    if (sessionStorage.getItem("user") == null) {
      window.location = "/";
    } else {
      const encryptedName = sessionStorage.getItem("name");
      setName(doDecryption(encryptedName));
    }
  }, []);

  function doDecryption(encryptedData) {
    let decryptedName = cryptoJs.AES.decrypt(encryptedData, "my-key");
    return JSON.parse(decryptedName.toString(cryptoJs.enc.Utf8));
  }
  //const encryptedName = sessionStorage.getItem("name");

  let navigate = useNavigate();
  const endSession = () => {
    sessionStorage.removeItem("userSession");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="sticky-top mb-3">
        <Navbar
          expand="lg"
          style={{
            backgroundImage: `url(${NavbarBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Sidebar />
          <Navbar.Brand id="textcolor" className="fw-bold" href="/user">
            <img src={logo} height="44vh" className="mx-4" />
          </Navbar.Brand>
          <div className="ps-3 pe-5 text-center ">
            <div className="text-dark fw-bold">
              Welcome <br />
              <span>{name}</span>
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-bold align-items-center">
              <Nav.Link className="text-dark" href="/postquestion">
                Post Question
              </Nav.Link>
              <Nav.Link className="text-dark" href="/viewQuestion">
                View Questions
              </Nav.Link>

              <Nav.Link className="text-light" href="/userprofile">
                <UserAvatar userName={name} />
              </Nav.Link>

              <Nav.Link id="textcolor" href="/">
                <form onSubmit={endSession} action="/">
                  <button type="submit" class="btn btn-sm btn-danger">
                    <span className="fs-6 ">LOGOUT</span>
                  </button>
                </form>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
