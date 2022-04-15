import React from "react";
import Cards from "./Cards";
import { Carousel, Card, CardGroup } from "react-bootstrap";
import Footer from "./Footer";
import Mainnavbar from "./Mainnavbar";
import Details from "./Details";
import pl from "../Images/pl.png";
import tc1 from "../Images/tc1.png";
import tools from "../Images/tools.png";

function Frontpage() {
  return (
    <>
      <div
        style={{ fontSize: "30px", backgroundColor: "#48bdbb" }}
        className="mb-0"
      >
        <marquee bgcolor="#48bdbb" direction="left" loop="">
          <div>
            Welcome To Learning-Pie : Ultimate Solution for All Questions
          </div>
        </marquee>
        {/* <marquee bgcolor="#48bdbb" direction="right" loop="">
          <div>
            Welcome To Learning-Pie : Ultimate Solution for All Questions
          </div>
        </marquee> */}
      </div>

      <div
        style={{
          backgroundColor: "#CBC7FC",
          // backgroundImage: "linear-gradient(to left, #FEE3CD, #ADD8E6)",
        }}
      >
        <Mainnavbar />
        {/* <div className="mt-0"></div> */}
        <div className="container">
          <div className="fluid-container bg-text">
            <div className="row">
              <Details></Details>
            </div>

            <div className="row my-4" style={{ height: "30vh" }}>
              <div className="col-md-6 d-flex justify-content-end align-items-center">
                <Cards
                  title="Join a group"
                  link="Join a group"
                  Description="Find the best answer to your technical question, help others answer theirs"
                  color="#FEE3CD"
                  buttonColor="royalblue"
                  width="400px"
                  href="/login"
                ></Cards>
              </div>
              <div className="col-md-6 d-flex justify-content-start align-items-center">
                <Cards
                  title="Create a group"
                  link="Create a group"
                  Description="Want a secure, private space for your technical knowledge?"
                  color="#CDE9FE"
                  buttonColor="yellow"
                  width="400px"
                  href="/login"
                ></Cards>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <Carousel interval={1000}>
                <Carousel.Item>
                  <img
                    className="d-block w-100 h-100"
                    //src="https://wallpapercave.com/wp/wp3638490.jpg"
                    src="https://quotefancy.com/media/wallpaper/3840x2160/4696797-Henry-Ward-Beecher-Quote-A-library-is-not-a-luxury-but-one-of-the.jpg"
                    alt=""
                  />
                  <Carousel.Caption>
                    <h3>
                      “When it comes to eLearning, content means everything. If
                      eLearning content is not masterfully designed, all the
                      rest will just go down the drain.”
                    </h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 h-100"
                    //src="https://quotefancy.com/media/wallpaper/3840x2160/1688672-Benjamin-Franklin-Quote-By-failing-to-prepare-you-are-preparing-to.jpg"
                    src="http://quotefancy.com/media/wallpaper/3840x2160/4899-Plato-Quote-A-house-that-has-a-library-in-it-has-a-soul.jpg"
                    alt=""
                  />

                  <Carousel.Caption>
                    <h3>
                      “eLearning doesn't just "happen"!! It requires careful
                      planning and implementation.”
                    </h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 h-100"
                    //src="https://quotefancy.com/media/wallpaper/3840x2160/1781173-Georg-Cantor-Quote-To-ask-the-right-question-is-harder-than-to.jpg"
                    src="https://quotefancy.com/media/wallpaper/3840x2160/6361629-Francis-Bacon-Quote-Knowledge-is-power.jpg"
                    alt=""
                  />

                  <Carousel.Caption>
                    <h3>
                      “In order to create an engaging learning experience, the
                      role of instructor is optional, but the role of learner is
                      essential.” - Patrick
                    </h3>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        <div className="text-align-center my-4 container">
          <h1 className="py-5 text-center align-content-center justify-content-center p-4">
            This is our Aim , our Mission and our Moto
          </h1>
          <CardGroup>
            <Card>
              <Card.Img variant="top" src={pl} />
            </Card>
            <Card style={{ backgroundColor: "#F7F5F4" }}>
              <Card.Img variant="top" src={tc1} style={{ height: "94%" }} />
            </Card>
            <Card>
              <Card.Img variant="top" src={tools} style={{ height: "100%" }} />
            </Card>
          </CardGroup>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Frontpage;
