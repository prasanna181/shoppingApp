import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { SocialIcon } from "react-social-icons";
import Logo from "./logo1.png";
import './Footer.css';
export default function Footer() {
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 50;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);
  return (
    <div className='footMainDiv reveal'>
    <SubscribeQuery/>
    <Footerthings />
    </div>
  )
}
const SubscribeQuery=()=>{
  return(
    <div className='subscribeQueryDiv'>
      <Container>
<Row>
  <Col>
  <div className='logoDiv'>
 <img className='logoFooter' src={Logo}/>
  </div>
   
  </Col>
  <Col>
    <div className='subscribeDiv'>
      <h6>SUBSCRIBE TO NEWSLETTER</h6>
      <div><input className='emailInput' type="email" placeholder='enter your Email'/><button className='inputSubmitButton'>Submit</button></div>
    </div>
  </Col>
  <Col className='forWindows'>
    <div className='queries'>
      <h6>FOR QUERIES</h6>
      <span>1800-300-1026 | support@mycloths.com</span>
      <br></br>
      <span>(Monday to Saturday, 10AM - 7PM)</span>
    </div>
  </Col>

</Row>
      </Container>
    </div>
  )
}

const Footerthings=()=>{

return (
  <Container>
    <Row>
      <Col>
        <div>
          <ul>
            <li>Who Are WE</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
      </Col>
      <Col>
        <div>
          <ul>
            <li>Help</li>
            <li>Shipping and Return Policy</li>
            <li>Help Center</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
      </Col>
      <Col>
        <div>
          <ul>
            <li>Responsibility Disclosure</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </Col>
      <Col>
        <div>
          <ul>
            <li>Quicklinks</li>
            <li>Offers</li>
            <li>Sitemap</li>
          </ul>
        </div>
      </Col>
    </Row>
    <hr />
    <Row>
      <Col className="forMobile">
        <div className="queries">
          <h6>FOR QUERIES</h6>
          <span>1800-300-1026 | support@mycloths.com</span>
          <br></br>
          <span>(Monday to Saturday, 10AM - 7PM)</span>
        </div>
        <hr />
      </Col>

      <Col>
        <div>
          <ul className="sociallist">
            <li style={{ display: "block", padding: "17px" }}>FOLLOW US</li>
            <li>
              <SocialIcon url="https://instagram.com/" className="seticon" />
            </li>
            <li>
              <SocialIcon url="https://twitter.com/" className="seticon" />
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  </Container>
);
  
}