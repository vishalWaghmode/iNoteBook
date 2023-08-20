import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.css'; // Import custom CSS file
import aboutImage from './../images/background.jpg'; // Import the about image
import intImage from './../images/1.png';
import secImage from './../images/2.png';
import thiImage from './../images/3.png';
import forImage from './../images/4.jpg';

const About = () => {
  return (

    <Container>
      <section className="bg1">
        <Row className="align-items-center mt-5">
          <Col md={6}>
            <div className="about-text">
              <h3>
                Welcome to our Notes website! We are passionate about providing you with
                the best note-taking experience possible.
              </h3>
              <br></br>
              <p>
                Our mission is to help you stay organized, boost your productivity, and
                capture your ideas effectively. With our user-friendly interface and
                powerful features, you can take notes effortlessly and access them
                anytime, anywhere.
              </p>
              <p>
                Thank you for choosing our Notes website. We hope you enjoy using it as
                much as we enjoyed creating it.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="about-image">
              <img src={aboutImage} alt="About" />
            </div>
          </Col>
        </Row>
      </section>
      <section className="bg2">
        <h3 className='Heading'>Simple Interface</h3>
        <Row className="align-items-center mt-5">
          <Col md={6}>
            <div class="fun">
              <div class="row row-cols-2 about-text">
                <div class="col col1">
                  <img className='img1' src={intImage} alt="About" />
                  <h4>Simple Interface</h4>
                  <p>
                    Thank you for choosing our Notes website. We hope you enjoy using it as
                    much as we enjoyed creating it.
                  </p>
                </div>
                <div class="col col1">
                  <img className='img1' src={secImage} alt="About" />
                  <p>
                    Thank you for choosing our Notes website. We hope you enjoy using it as
                    much as we enjoyed creating it.
                  </p>
                </div>
                <div class="col col1">
                  <img className='img1' src={thiImage} alt="About" />
                  <p>
                    Thank you for choosing our Notes website. We hope you enjoy using it as
                    much as we enjoyed creating it.
                  </p>
                </div>
                <div class="col col1">
                  <img className='img1' src={forImage} alt="About" />
                  <p>
                    Thank you for choosing our Notes website. We hope you enjoy using it as
                    much as we enjoyed creating it.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </Container>

  );
};

export default About;
