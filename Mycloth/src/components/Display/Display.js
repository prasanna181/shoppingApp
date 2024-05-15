import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faShoppingBag,
  faPersonBooth,
  faCashRegister,
  faHeart,
  faShippingFast,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider.jsx";
import { BASEURL } from "../../BASEURL";

import "react-toastify/dist/ReactToastify.css";
import {
  CCard,
  CCardHeader,
  CCardImage,
  CCardBody,
  CCardText,
  CCardFooter,
  CButton,
} from "@coreui/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// toast.configure()
const ProductLike = (id) => {
  const datastring = `id:${id}`;
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/productLike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(datastring),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        // togglesignup('login');
        // setsignup(signupintialvalues);
        // setError('');
      })
      .catch((error) => {
        reject(error);
        // setError('something went wrong! please try again later');
      });
  });
  return promise;
};

const Suggestions = (id) => {
  const datastring = `id:${id}`;
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/Suggest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(datastring),
    })
      .then((response) => {
        if (!response.ok) throw Error("data no found");
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

const addingWishlistByLikeButton = (userid, productid) => {
  const datastring = { userid: userid, productid: productid };
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/userAddingwishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datastring),
    })
      .then((response) => {
        if (!response.ok) throw Error("data no found");
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

const addingremoveByLikeButton = (userid, productid) => {
  const datastring = { userid: userid, productid: productid };
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/userRemovewishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datastring),
    })
      .then((response) => {
        if (!response.ok) throw Error("data no found");
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

const isProductLike = (arr, key) => {
  if (arr) {
    let isProductPresnt = false;
    arr.forEach((element) => {
      if (element === key) isProductPresnt = true;
    });
    return isProductPresnt;
  }

  return false;
};
// import ReactImageMagnify from "react-image-magnify";
const ProductImages = require.context("../../Images/display");

const bringtotop = () => {
  window.scroll(0, 0);
};

export default function Display(props) {
  const { backgroundColor, isAuthenticated, UserData } =
    React.useContext(DataContext);
  var { state } = useLocation();
  const [del, setD] = React.useState(state);
  const [middleImage, setMiddleImage] = React.useState(`${state.Image[0]}`);
  const [tp, settp] = React.useState(false);
  function handleMiddleImage(data) {
    document.getElementById("middleImageId").classList.add("slideInLeft");
    setMiddleImage(`${data.trim()}`);
    setTimeout(() => {
      document.getElementById("middleImageId").classList.remove("slideInLeft");
    }, 500);
  }
  const clickSuggestion = (data) => {
    setD(data);
    settp(true);
    handleMiddleImage(data.Image[0]);
  };

  return (
    <div
      style={{
        background: `${backgroundColor.background}`,
        color: `${backgroundColor.color}`,
      }}
    >
      <Temp
        state={del}
        clickSuggestion={clickSuggestion}
        middleImage={middleImage}
        handleMiddleImage={handleMiddleImage}
        data={isAuthenticated}
        UserData={UserData}
        tp={tp}
      />
    </div>
  );
}
const Temp = ({
  state,
  clickSuggestion,
  middleImage,
  handleMiddleImage,
  data,
  UserData,
  tp,
}) => {
  // {... props}
  const { backgroundColor } = React.useContext(DataContext);

  return (
    <>
      <Container
        style={{
          background: `${backgroundColor.background}`,
          color: `${backgroundColor.color}`,
        }}
        className="Main_container"
      >
        <Row>
          <Col xs lg="2" className="del">
            <ScrollImages state={state} handleMiddleImage={handleMiddleImage} />{" "}
          </Col>
          <Col md class="del" id="middleImageId">
            <img
              className="animation-photo"
              style={{ width: "inherit" }}
              alt="iamge"
              src={`${ProductImages(`./${middleImage}`)}`}
            />
          </Col>
          <Col lg className="del">
            <ProductDetails
              state={state}
              data={data}
              UserData={UserData}
              tp={tp}
            />
          </Col>
        </Row>
        <Row>
          <Suggestion state={state} clickSuggestion={clickSuggestion} />
        </Row>
      </Container>
    </>
  );
};
const ScrollImages = ({ state, handleMiddleImage }) => {
  const handleImageClick = (ev) => {
    handleMiddleImage(ev.target.id);
  };
  return (
    <div className="main-scroll">
      {state.Image.map((image) => {
        return (
          <div>
            {
              <div className="ScrollImages">
                <img
                  height={107}
                  width={80}
                  id={`${image}`}
                  onClick={handleImageClick}
                  src={ProductImages(`./${image}`)}
                />
              </div>
            }
          </div>
        );
      })}
    </div>
  );
};

//
const discountamount = (discount, original) => {
  let amount = original * (discount / 100);
  amount = Math.round(amount);
  return original - amount;
};

const ProductDetails = ({ state, data, UserData, tp }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowShip, setModalShowShip] = React.useState(false);
  const [modalShowExchange, setModalShowExchange] = React.useState(false);
  const [modalShowSizeGuide, setModalSizeGuide] = React.useState(false);
  const [showAddbutton, setShowAddtoCart] = React.useState(true);
  const { setproduct, product } = React.useContext(DataContext);
  const [likebutton, setlikebutton] = React.useState("#cacaca");
  const [tiimepass, setpimepass] = React.useState("");
  const navigate = useNavigate();

  const sendproductdetails = () => {
    // const datastring={userid:userid,productid:productid};
    const userid = UserData._id;
    // console.log(UserData)
    const sendData = {
      productData: state,
      userData: UserData._id,
    };

    const promise = new Promise((resolve, reject) => {
      fetch(`${BASEURL}/addtoCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
        .then((response) => {
          if (!response.ok) throw Error("data no found");
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };

  const productexist = (productid) => {
    product.map((ele) => {
      if (ele._id == productid) {
        setShowAddtoCart(false);
      }
    });
  };

  React.useEffect(() => {
    if (tp == true) {
      setShowAddtoCart(true);
      setlikebutton("#cacaca");
    }
    productexist(state._id);
    if (UserData) {
      if (isProductLike(UserData.Wishlist, state._id) === true) {
        setlikebutton("red");
      }
    }
  }, [state]);

  const Buttontoggle = () => {
    if (likebutton != "red") {
      // data(false);
      if (data === false) {
        navigate("/login");
      } else {
        setlikebutton("red");
        addingWishlistByLikeButton(UserData._id, state._id);
      }
    } else {
      setlikebutton("#cacaca");
      addingremoveByLikeButton(UserData._id, state._id);
    }
  };

  const addtocart = (state) => {
    if (data === false) {
      navigate("/login");
    } else {
      setproduct([...product, state]);
      sendproductdetails(state);
      setShowAddtoCart(false);
      toast("Product added in cart!");
    }
  };

  return (
    <div>
      <CashOnDelivery show={modalShow} onHide={() => setModalShow(false)} />
      <ExChangeProductDeatil
        show={modalShowExchange}
        onHide={() => setModalShowExchange(false)}
      />
      <Shipping show={modalShowShip} onHide={() => setModalShowShip(false)} />
      <SizeGuide
        show={modalShowSizeGuide}
        onHide={() => setModalSizeGuide(false)}
      />
      <div>
        <h3>
          {state.Brands}{" "}
          <button>
            <span>
              <FontAwesomeIcon
                className="likebutton"
                size="1x"
                id="No"
                onClick={() => {
                  Buttontoggle(state._id);
                }}
                color={likebutton}
                icon={faHeart}
                beat
                fade
              />
            </span>
          </button>{" "}
        </h3>
        <p className="categoires">{state.Category} </p>
        <div className="priceDiv"></div>

        <span className="originalPrice">
          ₹{discountamount(state.Discount, state.Price)}
        </span>
        <span className="discountPrice"> {state.Discount}% off </span>
        <p>
          MRP{" "}
          <span style={{ textDecoration: "line-through" }}>₹{state.Price}</span>{" "}
          inclusive of all taxes
        </p>
      </div>

      <hr></hr>

      {state.Size.length === 0 ? (
        ""
      ) : (
        <span>
          <span>Select Size</span>{" "}
          <span
            className="random"
            style={{ color: "red" }}
            onClick={() => setModalSizeGuide(true)}
          >
            Size Guide
          </span>{" "}
        </span>
      )}

      <div className="main-size">
        {state.Size.map((size) => {
          return (
            <>
              <span className="size-container">{size}</span>
            </>
          );
        })}
      </div>
      {showAddbutton && (
        <button className="bag-button" onClick={() => addtocart(state)}>
          Add to bag{" "}
          <span style={{ marginLeft: "10px" }}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </span>
        </button>
      )}

      {!showAddbutton && (
        <button className="bag-button disablebagbutton" disabled>
          Already added{" "}
          <span style={{ marginLeft: "10px" }}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </span>
        </button>
      )}
      <hr />
      <h4>Delivery Detail</h4>
      <div className="delivery-container">
        <div className="DelivaryDetailsContainer">
          <div style={{ textAlign: "center" }}>
            <FontAwesomeIcon size="2x" icon={faWallet} />
          </div>
          cash on delivery available <br></br>
          <a
            value={true}
            onClick={() => setModalShow(true)}
            style={{ color: "red", textDecoration: "none" }}
          >
            Know More
          </a>
        </div>

        <div className="DelivaryDetailsContainer">
          <div style={{ textAlign: "center" }}>
            <FontAwesomeIcon size="2x" icon={faCalendarDays} />
          </div>
          7 Days Return and Exchange <br></br>
          <a
            onClick={() => setModalShowShip(true)}
            style={{ color: "red", textDecoration: "none" }}
          >
            Know More
          </a>
        </div>
        <div className="DelivaryDetailsContainer">
          <div style={{ textAlign: "center" }}>
            <FontAwesomeIcon size="2x" icon={faShippingFast} />{" "}
          </div>{" "}
          usually ships in 2 days <br></br>
          <a
            onClick={() => setModalShowExchange(true)}
            style={{ color: "red", textDecoration: "none" }}
          >
            Know More
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>

    // </div>
  );
};

//For Deliery

const CashOnDelivery = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cash On Delivery
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <h3>
            {" "}
            <b>TERMS AND CONDITIONS</b>
          </h3>
          Cash on delivery is available for orders between ₹500 to ₹30,000.
          However, cash on delivery will not be available if there are one or
          more "Made to Order" products in the order.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ExChangeProductDeatil = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2> Return & Exchange Details</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <h3>
            {" "}
            <b>TERMS AND CONDITIONS</b>
          </h3>
          <ol>
            <li>
              Once your order is delivered, you can raise a return or exchange
              (whichever is applicable) from My orders section on app or
              website. Delivery executive will pick up your item within 7
              working days.
            </li>
            <li>
              In case of return, refund will be initiated to your source (or
              bank account in case of cash on delivery) within 5-7 working days
              after the item is picked up.
            </li>
            <li>
              In case of exchange, the replacement item will be shipped to your
              original address with no extra cost.
            </li>
          </ol>
          If you have any more questions, you can always reach out to us at
          support@apnafashion.com
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
const Shipping = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2> Delivery Details</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <ul>
            <li>
              {" "}
              <h3>DELIVERY</h3>
              With Nykaa Fashion, you can be assured that the item you purchase
              is genuine & will reach you within the estimated delivery date.
            </li>
            <li>
              <h3>EXPRESS DELIVERY</h3>
              There are products with shorter delivery time, look out for
              products with "Express delivery" tag & get faster delivery.
            </li>
            <li>
              <h3>SHIPPING</h3>
              Shipping is free for all orders with a subtotal amount greater
              than ₹999. A shipping charge of ₹99 is applicable on all orders
              below ₹999. Note - Shipping charges are calculated basis subtotal
              amount on cart.
            </li>
          </ul>
          <hr></hr>
          CANCELLATION POLICY After placing an order, you can directly cancel it
          through the "My order" section before the item(s) that you want to
          cancel are shipped. If your order is a ' Made-to-Order' piece, you can
          cancel within 24 hrs of placing by writing to customer care at
          "support@apnafashion.com" Note - Post cancellation, the money will be
          refunded to you within 5 business days after the cancellation request.
          <hr></hr>
          If you have any more questions, you can always reach out to us at
          support@apnafashion.com
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

function SizeGuide(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4> Size Guide</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>
          We have provided the products measurements to help you decide which
          size to buy
        </span>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest</th>
              <th>Waist</th>
              <th>Shoulder</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S</td>
              <td>36.0</td>
              <td>35.0</td>
              <td>@16.0</td>
              <td>26.5</td>
            </tr>
            <tr>
              <td>M</td>
              <td>38.0</td>
              <td>37.0</td>
              <td>17.0</td>
              <td>27.5</td>
            </tr>
            <tr>
              <td>L</td>
              <td>40.0</td>
              <td>39.0</td>
              <td>17.5</td>
              <td>28.5</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>42.0</td>
              <td>41.0</td>
              <td>18.5</td>
              <td>29.5</td>
            </tr>
            <tr>
              <td>2XL</td>
              <td>44.0</td>
              <td>43.0</td>
              <td>20.0</td>
              <td>30.5</td>
            </tr>
          </tbody>
        </Table>

        <div>
          <img
            alt="sizeGuide"
            src={`${ProductImages(`./shirtSizeGuide.jpg`)}`}
          />
          <img
            alt="sizeGuide"
            src={`${ProductImages(`./shoesSizeGuide.jpg`)}`}
          />
          <img
            alt="sizeGuide"
            src={`${ProductImages(
              `./WhatsApp Image 2023-01-06 at 23.51.01.jpg`
            )}`}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Suggestion = ({ state, clickSuggestion }) => {
  const [suggestionProduct, setSuggestionProduct] = React.useState([]);
  const [Top, setTop] = React.useState({});
  React.useEffect(() => {
    Suggestions(state._id)
      .then((data) => {
        setSuggestionProduct(data.data);
      })
      .then((error) => {});
  }, []);

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
  const dislplaysuggestion = (data) => {
    clickSuggestion(data);
  };

  return (
    <div>
      <h4 className="suggestions-css">Suggestions</h4>
      <Carousel responsive={responsive} style={{ margin: "2px" }}>
        {suggestionProduct.map((data) => {
          return (
            <div>
              <div className="suggestion-card">
                <CCard
                  className="cardDis"
                  style={{ width: "18rem", color: "black" }}
                >
                  {/* <CCardImage orientation="top" src="/images/react.jpg" /> */}

                  <CCardBody>
                    <Container>
                      <Row>
                        <Col>
                          <CCardImage
                            height="120px"
                            orientation="top"
                            alt="image"
                            src={ProductImages(`./${data.Image[0]}`)}
                          />
                        </Col>
                        <Col xs lg="4">
                          <Row className="sugeestionSmallImages">
                            <CCardImage
                              height="120px"
                              orientation="top"
                              alt="image"
                              src={ProductImages(`./${data.Image[1]}`)}
                            />
                          </Row>
                          <Row className="sugeestionSmallImages">
                            <CCardImage
                              height="120px"
                              orientation="top"
                              alt="image"
                              src={ProductImages(`./${data.Image[0]}`)}
                            />
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                    {/* <CCardImage
                  height="120px"
                  orientation="top"
                  alt="image"
                src={ProductImages(`./${data.Image[0]}`)}
                /> */}
                  </CCardBody>
                  <CCardFooter>
                    <CCardText>
                      <div className="suggestion-cards">
                        <h4>{data.Brands}</h4>
                        <div>
                          ₹
                          <span className="discountPrice">
                            {discountamount(data.Discount, data.Price)}
                          </span>{" "}
                          <del className="originalPrice">{data.Price}</del>
                          <span className="discount">{data.Discount}%</span>
                        </div>
                      </div>
                    </CCardText>
                    <CButton
                      className="suggestionViewButon"
                      onClick={() => {
                        dislplaysuggestion(data);
                        bringtotop();
                      }}
                    >
                      View <FontAwesomeIcon icon={faPersonBooth} />
                    </CButton>
                  </CCardFooter>
                </CCard>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
