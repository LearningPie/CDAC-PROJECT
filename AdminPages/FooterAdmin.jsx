import React from 'react'
import { Link } from 'react-router-dom'
import FooterBackground from '../Images/footer.jpg'

function Footer() {
  return (
    <div
      style={{
        backgroundImage: `url(https://wallpaperaccess.com/full/676347.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <footer class=' p-4'>
        <div class='container text-center text-md-left'>
          <div class='row text-center text-md-left'>
            <div class='col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
              <h5 class='text-uppercase mb-4 font-weight-bold text-light'>
                LEARNING-PIE
              </h5>
              <p class='text-light'>
                Learning-Pie is the largest, most trusted online community for
                developers to learn, share their programming knowledge, and
                build their careers.
              </p>
            </div>

            <div class='col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
              <h5 class='text-uppercase mb-4 font-weight-bold text-light'>
                Products
              </h5>
              <p>
                <a
                  href='#'
                  class='text-light'
                  style={{ textDecoration: 'none' }}
                >
                  Teams
                </a>
              </p>
              <p>
                <a
                  href='#'
                  class='text-light'
                  style={{ textDecoration: 'none' }}
                >
                  Talent
                </a>
              </p>
            </div>

            <div class='col-md-3 col-lg-2 col-xl-2 mx-auto mt-3'>
              <h5 class='text-uppercase mb-4 font-weight-bold text-light'>
                Useful links
              </h5>
              <p>
                <Link
                  to='/home'
                  class='text-light'
                  style={{ textDecoration: 'none' }}
                >
                  HOME
                </Link>
              </p>
              <p>
                <Link
                  to='#'
                  class='text-light'
                  style={{ textDecoration: 'none' }}
                >
                  Technology
                </Link>
              </p>
              <p>
                <Link
                  to='#'
                  class='text-light'
                  style={{ textDecoration: 'none' }}
                >
                  Work Here
                </Link>
              </p>
            </div>

            <div class='col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 text-light'>
              <h5 class='text-uppercase mb-4 font-weight-bold text-light'>
                Contact
              </h5>
              <p>
                <i class='fa fa-home mr-3'></i>Khargar, Mumbai
              </p>
              <p>
                <i class='fa fa-envelope mr-3'></i>learningpie123@gmail.com
              </p>
              <p>
                <i class='fa fa-phone mr-3'></i>+91 7385737698
              </p>
              <p>
                <i class='fa fa-phone mr-3'></i>+91 9834065425
              </p>
            </div>
          </div>

          <div class='row align-items-center'>
            <div class='col-md-7 col-lg-12 m-auto text-light'>
              <p>
                Copyright ©2020 All rights reserved by:
                <a href='/aboutUs' style={{ textDecoration: 'none' }}>
                  <strong class='text-light textcolor'>
                    Team 19 CDAC MUMBAI
                  </strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
