import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import "./cart.css";
import Footer from '../Footer/Footer.js'
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../BASEURL.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faTrash,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const ProductImages = require.context("../../Images/display");

const getAllInitialData = (id) => {
  const data = {
    id: id,
  };
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/getAllCartData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

const removesavelater = (userData, productData) => {

  const data = {
    userData: userData._id,
    productData: productData._id,
  };

  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/removeFromSaveLater`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

const removeFromCartFromServer = (userData, productData) => {
  const data = {
    userData: userData._id,
    productData: productData._id,
  };

  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/removefromcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

const SaveForLater = (userData, item) => {
  // const data = signup;
  // alert(userData)
  const data = {
    userData: userData,
    productData: item,
  };
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/saveforlater`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

export default function Cart() {
  const { setproduct, product,UserData } = React.useContext(DataContext);
  
  const { backgroundColor } = React.useContext(DataContext);
  //  const [cartData,setCartData]=React.useState([]);
  const [filter, setFilter] = React.useState([]);
  React.useEffect(() => {
    if (UserData) {
      getAllInitialData(UserData._id).then((data) => {
        setproduct(data.response.cart);
        setFilter(data.response.saveForLater);
      });
    }
  }, [UserData]);

  const handledisplaysaveforlater = (data) => {
    setFilter([...filter, data]);
    SaveForLater(UserData, data).then((response) => {
      toast("Save For Later Added");
    });
  };
  const checkFilterSaveForLater = (key, arr) => {
    var flag = true;
    arr.forEach((data) => {
      if (data._id === key) {
        flag = false;
      }
    });
    return flag;
  };
  //remove  from save for later and add into product
  const removeFromSaveForLater = (data, props) => {
    var temp = filter.filter((item) => {
      return !(item._id === data._id);
    });
    setFilter(temp);
  };
  const removeFromCart = (data, UserData) => {
    const there = product.filter((item) => {
      return !(item._id === data._id);
    });
    setproduct(there);
    removeFromCartFromServer(UserData, data);
  };

  const productData = product.filter((item) => {
    return checkFilterSaveForLater(item._id, filter);
  });

  return (
    <div className="Main_container">
      <Container
        style={{
          background: `${backgroundColor.background}`,
          color: `${backgroundColor.color}`,
        }}
      >
        <Row style={{background: "#fae1dd"}}> 
          <Col sm='6' className="left_container">
            <Row className="main-card">
              {productData && (
                <ProductDetail
                  product={productData}
                  handledisplaysaveforlater={handledisplaysaveforlater}
                  removeFromCart={removeFromCart}
                  UserData={UserData}
                />
              )}
            </Row>
            <Row className="main-card">
              {filter && (
                <Saveforlater
                  data={filter}
                  removeFromSaveForLater={removeFromSaveForLater}
                  UserData={UserData}
                />
              )}
            </Row>
          </Col>
          {product.length !== 0 && (
            <Col className="right_container" xs lg="4" style={{height: "max-content",
    position: "relative",
    top: "40px"}}>
              <MoneyDetail product={productData} />
            </Col>
          )}
        </Row>
   
      </Container>
      <ToastContainer />
 
    </div>
  );
}

const DiscountAmount = (original, discount) => {
  let amount = original * (discount / 100);
  amount = Math.round(amount);
  return original - amount;
};
const ProductDetail = ({
  product,
  handledisplaysaveforlater,
  removeFromCart,
  UserData,
}) => {
  const [price, setprice] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const navigate = useNavigate();
  var priceVs = 0;

  const handlesaveforlater = (data) => {
    handledisplaysaveforlater(data);
  };

  const gotopayment = (product)=> {
    navigate("/Payment");
  };

  const handleRemovefromCart = (data) => {
    removeFromCart(data, UserData);
  };
  return (
    <div>
      {product.map((d) => {
        return (
          <div className="product-row">
            <h4 className="product-details">{d.Category} :-</h4>

            <Container>
              <Row classname="saveforlater">
                <Col>
                  <img
                    className="imagecart"
                    src={ProductImages(`./${d.Image[0]}`)}
                  />
                </Col>
                <Col sm="7" className="product-section">
                  <div>
                    <div className="product-details">{d.Brands}</div>
                    <div>
                      <span
                        className="product-details"
                        style={{ color: "green" }}
                      >
                        ₹{DiscountAmount(d.Price, d.Discount)}
                      </span>
                      <span
                        style={{ textDecoration: "line-through", color: "red" }}
                      >
                        ₹{d.Price}
                      </span>
                      <div className="product-details">{d.Discount}% off</div>
                    </div>
                    <div className="cartButton">
                      <button
                        className="product-details button"
                        onClick={() => handlesaveforlater(d)}
                        title="Save For Later"
                      >
                        Save for later  <FontAwesomeIcon icon={faBookmark} />
                      </button>
                      <button
                        onClick={() => handleRemovefromCart(d)}
                        className="product-details button adjustremove"
                        title="Remove"
                      >
                        Remove  <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
      <div className="PlaceOrder">
        <button
          className="place-order product-details"
          onClick={() => gotopayment(product)}
        >
          Place Order <FontAwesomeIcon icon={faTruckFast} />
        </button>
      </div>
    </div>
  );
};

const MoneyDetail = ({ product }) => {
  var totalPrice = 0;
  var discountPrice = 0;
  product.forEach((ele) => {
    totalPrice += ele.Price;
    discountPrice += DiscountAmount(ele.Price, ele.Discount);
  });
  return (
    <div className='moneydetails'>
      <div className="productDetailsHeading">Product Details</div>
      <hr />
      <div>
        <div className="Prices">
          <span>Price(1)</span>
          <span>₹{totalPrice}</span>
        </div>
        <div className="Prices">
          <span>Discount</span>
          <span>₹{totalPrice - discountPrice}</span>
        </div>
        <div className="Prices">
          <span>Delivery Charges</span>
          <span>₹90</span>
        </div>
        <hr class="dashed-line" />
        <div className="TotalPrice">
          <span>Total Amount</span>
          <span>₹{discountPrice + 90}</span>
        </div>
        <hr class="dashed-line" />
        <div className="saveMoney">
          You will save ₹{totalPrice - discountPrice} on this order
        </div>
      </div>
    </div>
  );
};
const Saveforlater = ({ data, removeFromSaveForLater, UserData }) => {
  const handleremove = (data) => {
    removeFromSaveForLater(data);
    // remove from save for later

    removesavelater(UserData, data);
  };
  return (
    <div>
      <h1 className="saveForlaterheader">Save For Later <FontAwesomeIcon icon={faClock}/></h1>
      {data.map((d) => {
        return (
          <div className="product-row">
            <h4 className="product-details">{d.Category} :-</h4>
            <hr className="dashed-line"></hr>
            <Container>
              <Row>
                <Col>
                  <img
                    className="imagecart"
                    src={ProductImages(`./${d.Image[0]}`)}
                  />
                </Col>
                <Col sm="7" className="product-section">
                  <div className="product-details">{d.Brands}</div>
                  <div>
                    <span
                      className="product-details"
                      style={{ color: "green" }}
                    >
                      ₹{DiscountAmount(d.Price, d.Discount)}
                    </span>
                    <span
                      style={{ textDecoration: "line-through", color: "red" }}
                    >
                      ₹{d.Price}
                    </span>
                    <span className="product-details">{d.Discount}% off</span>
                  </div>
                  <button
                    className="product-details button"
                    onClick={() => handleremove(d)}
                    title="Remove From save for later"
                  >
                    Remove from here <FontAwesomeIcon icon={faTrash} bounce />
                  </button>
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
    </div>
  );
};
