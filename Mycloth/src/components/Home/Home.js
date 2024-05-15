import React from "react";
// import Carousel from "react-bootstrap/Carousel";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useNavigate } from "react-router-dom"; 
import {
  CCard,

  CCardImage,

  CCardText,

  CButton
} from "@coreui/react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";

import { DataContext } from "../context/DataProvider.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faPersonBooth, faSpinner} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/loader";
import { Parallax } from "react-parallax";
import { BASEURL } from "../../BASEURL";
import Footer from '../Footer/Footer'

const ProductImages= require.context("../../Images/display");
const HomeImage= require.context("../../Images/home");



//get MOST Men Like Image
const MostMenLikeProduct = () => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/mostLikeMensProduct`)
      .then((res) => {
        if (!res.ok) throw Error("Internal Server Error");
        return res.json();
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};


function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

const Home = () => {
  const [Product, setProduct] = React.useState([]);
  const { recentView, setRecentView } = React.useContext(DataContext);
  const inputRef = React.useRef("top");
  const [watch, setWatch] = React.useState("");

  const recentViewData = JSON.parse(localStorage.getItem("recentView_online"));
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
  />;
  const [bgcounter, setbscounter] = React.useState(2);
  // setAnimation("animated flip");
  
  setTimeout(() => {
    // animated flip
 
          setbscounter((bgcounter + 1) % 4);
    
  },6000)


 
  React.useEffect(() => {
    MostMenLikeProduct()
      .then((data) => {
        setProduct(data.data);

        data.data.map((e) => {
          if (e._id === "63ade899716f80591018f9b5") setWatch(e);
        });
      })
      .then((error) => {});
  }, []);
  const navigate = useNavigate();
  return (
    <div style={{ background: "#49494a" }}>
      <div className="Home-container">
        <div ref={inputRef} id="top"></div>
        {/* <div className="HomePagePoster">
          <img
            src={HomeImage(`./${bgcounter}.jpg`)}
            style={{
              "object-fit": "cover",
              "object-position": "center",
              height: "fit-content",
            }}
            width="100%"
          />
        </div> */}

        <div className="ParallaxDiv">
          <Parallax
            className="banner"
            style={{ overflow: "inherit", transform: "rotateY(180deg)" }}
            // className={Animation}
            bgImage={HomeImage(`./${bgcounter}.jpg`)}
         
        
            renderLayer={(percentage) => (
              <div
                className="insideParallax"
                style={{
                  position: "absolute",
                  background: `rgba(255 125 0 / 0%, ${percentage * 1})`,
                  left: "10%",
                  top: "30%",
                  width: percentage * 250,
                  height: percentage * 250,
                }}
              >
                <img
                  className="animated flip"
                  src={HomeImage(`./${bgcounter}.jpg`)}
                  style={{
                    "object-fit": "cover",
                    "object-position": "center",
                    height: "fit-content",
                  }}
                />
              </div>
            )}
          ></Parallax>

          <div className="ImageTextDiv">
            <span className="tradeinofffer">Trade-in-offer</span>
            <div className="superValueDeal">Super value deals</div>
            <div className="onallproduct">On all product</div>
            <button
              onClick={() => {
                navigate("/Men");
              }}
              className="exploreButton"
            >
              Explore <FontAwesomeIcon icon={faLongArrowAltRight} />
            </button>
          </div>
        </div>
        <WatchShowCase data={watch} />
        <div className="RecentandBest">
          {recentViewData && (
            <div>
              <section>
                <div class="containerHome reveal ">
                  <RecentView recentViewData={recentViewData} />
                </div>
              </section>
            </div>
          )}
          <div>
            <section>
              <div class="containerHome reveal">
                {Product && <BestSallerMen Product={Product} />}
                {Product.length === 0 && (
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};



 const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

 const discountamount=(discount,original)=>{
    let amount= original*(discount/100);
    amount=Math.round(amount);
    return original-amount;
  }
const RecentView=({recentViewData})=>{

  const [showDetail,setShowDetail]=React.useState(0);
  const [addClasses,setAddclasses]=React.useState("");
   function ShowThem(id) {
     setShowDetail(id);
     setAddclasses("cardHoverDetailhover");
   }
   function HideThem() {
     setShowDetail(0);
     setAddclasses("");
   }
 if(recentViewData){
return (
  <div className="recentViewDiv">
    <h1 className="header_product">
      {" "}
      Recent View<div className="smallDot"></div>
    </h1>

    <div className="Carousel_recentdiv">
      {" "}
      <Carousel responsive={responsive} style={{ margin: "2px" }}>
        {recentViewData.map((data) => {
          return (
            <div>
              <div style={{ marginLeft: "10px" }}>
                <CCard
                  className="FoucsCards"
                  style={{
                    margin: "auto",
                    color: "black",
                    width: "80%",
                    border: "0px",
                    background: "white",
                  }}
                  onMouseEnter={() => {
                    ShowThem(data._id);
                  }}
                  onMouseLeave={() => {
                    HideThem();
                  }}
                >
                  {/* <div className="sugeestionSmallImages"> */}
                  <CCardImage
                    orientation="top"
                    alt="image"
                    src={ProductImages(`./${data.Image[0]}`)}
                    height="11rem"
                  />
                  {/* </div> */}

                  {showDetail === data._id && (
                    <div className={`cardHoverDetail ${addClasses}`}>
                      <CCardText>
                        <div className="suggestion-cards">
                          <div className="recentViewDetail">
                            <span>{data.Brands}</span>{" "}
                          </div>
                          <div>
                            ₹
                            <span className="discountPrice">
                              {discountamount(data.Discount, data.Price)}
                            </span>{" "}
                            <del className="originalPrice">{data.Price}</del>
                            <span className="discount">
                              {data.Discount}%
                            </span>{" "}
                          </div>
                        </div>
                      </CCardText>
                      <Link // <-- use Link component
                        to={`/Display/${data._id}`}
                        state={data} // <-- pass item object in state
                        className="LinkCSS"
                      >
                        <CButton
                          className="suggestionViewButon"
                          style={{
                            background: "#0000009c",
                            borderRadius: "33px",
                          }}
                        >
                          View <FontAwesomeIcon icon={faPersonBooth} />
                        </CButton>
                      </Link>
                    </div>
                  )}
                </CCard>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  </div>
);
 }
  
}

const BestSallerMen = ({ Product }) => {
  const [showDetail, setShowDetail] = React.useState(0);
  const [addClasses, setAddclasses] = React.useState("");
  const[watch,setWatch]=React.useState("");

 
  function ShowThem(id) {
    setShowDetail(id);
    setAddclasses("cardHoverDetailhover");
  }
  function HideThem() {
    setShowDetail(0);
    setAddclasses("");
  }
  return (
    <div className="bestsellerDiv">

      <h1 className="header_product">
        {" "}
        House Of mycloths<div className="smallDotHouse"></div>
      </h1>
      <div className="Carousel_recentdiv">
        {Loader && (
          <Carousel responsive={responsive} style={{ margin: "2px" }}>
            {Product.map((data) => {
              return (
                <div>
                  <div style={{ marginLeft: "10px" }}>
                    <CCard
                      className="FoucsCards"
                      style={{
                        margin: "auto",
                        color: "black",
                        width: "80%",
                        border: "0px",
                        background: "white",
                      }}
                      onMouseEnter={() => {
                        ShowThem(data._id);
                      }}
                      onMouseLeave={() => {
                        HideThem();
                      }}
                    >
                      <span className="mostLikeProductdiscount">
                        {data.Discount}% OFF
                      </span>
                      <div className="sugeestionSmallImages">
                        <CCardImage
                          orientation="top"
                          alt="image"
                          src={ProductImages(`./${data.Image[0]}`)}
                          height="11rem"
                        />

                        {showDetail === data._id && (
                          <div className={`cardHoverDetail ${addClasses}`}>
                            <CCardText>
                              <div className="suggestion-cards">
                                <div className="recentViewDetail">
                                  <span>{data.Brands}</span>{" "}
                                </div>
                                <div>
                                  ₹
                                  <span className="discountPrice">
                                    {discountamount(data.Discount, data.Price)}
                                  </span>{" "}
                                  <del className="originalPrice">
                                    {data.Price}
                                  </del>
                                  <span className="discount">
                                    {data.Discount}%
                                  </span>{" "}
                                </div>
                              </div>
                            </CCardText>
                            <Link // <-- use Link component
                              to={`/Display/${data._id}`}
                              state={data} // <-- pass item object in state
                              className="LinkCSS"
                            >
                              <CButton
                                className="suggestionViewButon"
                                style={{
                                  background: "#0000009c",
                                  borderRadius: "33px",
                                }}
                              >
                                View <FontAwesomeIcon icon={faPersonBooth} />
                              </CButton>
                            </Link>
                          </div>
                        )}
                      </div>
                    </CCard>
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    </div>
  );
};
const WatchShowCase=({data})=>{
  return (
    <div style={{background:"White"}}>
      <Container>
        <Row>
          <Col className="ImageWatchCol">
            <div className="ImageWatch">
              <img src={HomeImage("./watch.jpg")} height="400px" />
            </div>
          </Col>
          <Col style={{ backgroundColor: "#E8E8E4" }}>
            <div className="reveal watchDetailDiv">
              <div className="watchDetailHeader">
                Upgrade Your Life with a Smart Watch!
              </div>
              <span className="watchDetailSpan">
                Are you tired of missing important calls, texts, or emails while
                you're on the go? Do you want to take your fitness tracking to
                the next level? Enter our contest for a chance to win a
                state-of-the-art smartwatch!
              </span>
              <Link // <-- use Link component
                to={`/Display/63ade899716f80591018f9b5`}
                state={data} // <-- pass item object in state
                className="LinkCSS"
              >
                <button className="watchDetail">
                  See Detail <FontAwesomeIcon icon={faLongArrowAltRight} />
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}




export default Home;
