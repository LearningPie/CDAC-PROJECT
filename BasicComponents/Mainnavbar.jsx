import { useState } from 'react'
import { Button, Modal, Nav, Navbar } from 'react-bootstrap'
import logo from '../Images/logo.png'
import NavbarBackground from '../Images/footer.jpg'

export default function Mainnavbar() {
  return (
    <>
      <div className='sticky-top '>
        <Navbar
          expand='lg'
          style={{
            backgroundImage: `url(${NavbarBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className='d-flex justify-content-start'>
            <Navbar.Brand className='fw-bold text-warning' href='/'>
              <img src={logo} height='44vh' className='mx-4' />
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto fw-bold align-items-center '>
              <Nav.Link id='textcolor' className='text-dark' href='/'>
                HOME
              </Nav.Link>
              <Nav.Link id='textcolor' href='/register' className='text-dark'>
                REGISTER
              </Nav.Link>
              <Nav.Link id='textcolor' href='/login' className='text-dark'>
                LOGIN
              </Nav.Link>
              {/* <NavDropdown title='LOGIN' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='/Studentlogin'>
                    STUDENT LOGIN
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/AdminLogin'>
                    ADMIN LOGIN
                  </NavDropdown.Item>
                </NavDropdown> */}
              <Nav.Link id='textcolor' href='/FAQ' className='text-dark'>
                F&Q
              </Nav.Link>
              <Nav.Link id='textcolor' href='/aboutUs' className='text-dark'>
                ABOUT US
              </Nav.Link>
              {/* <Nav.Link id="textcolor" href="/aboutUs" className="text-light">
                About Us
              </Nav.Link>
              <Example /> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  )
}

function Example() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Button id='textcolor' variant='dark' onClick={handleShow}>
        <b>ABOUT US</b>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-primary text-light' closeButton>
          <Modal.Title>About Learning Pie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Who we are
          <h4>
            Empowering the world to develop technology through collective
            knowledge.
          </h4>
          Our public platform serves 100 million people every month, making it
          one of the most popular websites in the world. Our asynchronous
          knowledge management and collaboration offering, Learning Pie for
          Teams, is transforming how people work.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
