import React from "react";
import styled from "styled-components";
const About_Section = styled.div`
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
  &:hover {
    transform: scale(1.05);
  }
`;

const Column = styled.div`
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
  @media screen and (max-width: 650px) {
    width: 100%;
    display: block;
  }
`;

const Container = styled.div`
  padding: 0 16px;
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;
const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;
const Button = styled.button`
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #555;
  }
`;

function AboutScreen() {
  return (
    <div>
      <About_Section>
        <h1>About Us</h1>
        <p style={{ whiteSpace: "pre-line", display: "block" }}>
          <span style={{ display: "block" }}>
            E-store first made waves in Pakistan’s e-commerce market. Our vision
            is to provide a safe, efficient online marketplace platform for
            vendors and customers across the country to come together.<br></br>
          </span>
          <span></span>
          <span style={{ display: "block" }}>
            E-Store prides itself on not being just another ecommerce venture in
            Asia. We work tirelessly to make sure that we provide users with the
            best online online shopping experience and best products.
          </span>
        </p>
      </About_Section>

      <h2 style={{ textAlign: "center",fontSize:"25px" }}>Our Team</h2>
      <Row>
        <Column>
          <Card>
            <img
              src="/images/Mike.jpg"
              alt="Mike"
              style={{ width: "100%", height: "330px", objectFit: "cover" }}
            />
            <Container>
              <h2>Mike Ross</h2>
              <p className="title" style={{ color: "grey" }}>
                Art Director
              </p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p>
                <Button>Contact</Button>
              </p>
            </Container>
          </Card>
        </Column>

        <Column>
          <Card>
            <img
              src="/images/Pic.jpg"
              alt="Junaid"
              style={{ width: "100%", height: "330px", objectFit: "cover" }}
            />
            <Container>
              <h2>Junaid Qureshi</h2>
              <p className="title" style={{ color: "grey" }}>
                CEO & Founder
              </p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>junaid@example.com</p>
              <p>
                <Button>Contact</Button>
              </p>
            </Container>
          </Card>
        </Column>

        <Column>
          <Card>
            <img
              src="/images/john.jpg"
              alt="John"
              style={{ width: "100%", height: "330px", objectFit: "cover" }}
            />
            <Container>
              <h2>John Doe</h2>
              <p className="title" style={{ color: "grey" }}>
                Designer
              </p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>john@example.com</p>
              <p>
                <Button>Contact</Button>
              </p>
            </Container>
          </Card>
        </Column>
      </Row>
    </div>
  );
}

export default AboutScreen;
