import React, { useState } from "react";
import { Carousel, CarouselItem, Col, Container, Row } from "react-bootstrap";
import "../assets/css/login.css";
import LoginForm from "../components/LoginForm";
import OTPForm from "../components/OTPForm";

const Login = () => {

  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);

  const handleNext = (data) => {
    setUser({ ...user, ...data });
    setId({ ...id, ...data });
    setStep(step + 1);
  };


  return (
    <div>
      <img src="./images/restro6.png" className="bg" alt="" />
      <Container>
        {/* <h1 style={{color: "black"}}>Hello</h1> */}
        <Row>
          <Col style={{ height: "100%", textAlign: "center", marginTop: "6%" }}>
            <img src=".\images\zesty-without-bg-black.png" alt="" style={{ width: "400px" }} />

            <p className="lead" style={{ color: "#000", marginTop: "-100px" }}>PARTNER WITH <strong>ZESTY!</strong></p>

            <img src="./images/stroke.svg" alt="" />

            <Carousel prevIcon="" nextIcon="" style={{ height: "120px" }} slide={false} >
              <CarouselItem>
                <h2 color="#000">Increase your online orders</h2>
              </CarouselItem>
              <CarouselItem>
                <h2 color="#000">Reach customers far away from you</h2>
              </CarouselItem>
              <CarouselItem>
                <h2 color="#000">Access to Zesty tools and support</h2>
              </CarouselItem>
            </Carousel>
          </Col>
          <Col>
            {step === 1 && <LoginForm onNext={handleNext} />}
            {step === 2 && <OTPForm phone={user} onNext={handleNext} id={id} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;