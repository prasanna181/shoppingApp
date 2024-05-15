import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./Wishlist.css";
import { DataContext } from "../context/DataProvider.jsx";
import { BASEURL } from "../../BASEURL";
import Loader from "../Loader/loader";
const ProductImages = require.context("../../Images/display");

const apiCall = (UserData) => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: getAccessToken()
      },
      body: JSON.stringify(UserData.Wishlist),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error);
        // setError('something went wrong! please try again later');
      });
  });
  return promise;
};

export default function Wishlist() {
  const [wishlists, setWishlists] = React.useState([]);
  const { UserData } = React.useContext(DataContext);

  React.useEffect(() => {
    apiCall(UserData).then((data) => {
      setWishlists(data);
    });
  }, [UserData]);

  if (wishlists) {
    return (
      <div className="Main_Div">
        <h1 className="header_product">Your Wishlist Here..</h1>
        {wishlists.length !== 0 && <Wishes data={wishlists} />}
        {wishlists.length === 0 && <Loader />}
      </div>
    );
  }
}

const Wishes = ({ data }) => {
  const discountamount = (discount, original) => {
    let amount = original * (discount / 100);
    amount = Math.round(amount);
    return original - amount;
  };

  if (data) {
    return (
      <div
        className="styleproducts"
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          justifyContent: "space-around",
          margin: "10px",
        }}
      >
        {data.map((d) => {
          return (
            <div className="product-map-container">
              <Link // <-- use Link component
                to={`/Display/${d._id}`}
                state={d} // <-- pass item object in state
                className="LinkCSS"
              >
                <Card className="Card-Container">
                  <Card.Img
                    style={{ height: "16rem" }}
                    variant="top"
                    src={ProductImages(`./${d.Image[0]}`)}
                  />
                  <Card.Body>
                    <div className="BrandName">{d.Category}</div>
                    <div className="category">{d.Brands} </div>
                    <hr />
                    <Card.Text>
                      <div>
                        ₹
                        <span className="discountPrice">
                          {discountamount(d.Discount, d.Price)}
                        </span>{" "}
                        <del className="originalPrice">{d.Price}</del>
                        <span className="discount">{d.Discount}%</span>
                      </div>
                      <span>
                        {d.Size.map((t) => {
                          return (
                            <span>
                              <span>{t} </span>
                            </span>
                          );
                        })}
                      </span>
                      <div>
                        {d.Color.map((c) => {
                          return (
                            <div
                              style={{
                                display: "inline-block",
                                width: "20px",
                                margin: "5px",
                              }}
                            >
                              {
                                <strong
                                  style={{
                                    background: `${c}`,
                                    display: "inline-block",
                                    width: "20px",
                                  }}
                                  className="colorProduct"
                                ></strong>
                              }
                            </div>
                          );
                        })}
                        <span className="views">
                          <FontAwesomeIcon icon={faEye} />{" "}
                          {d.Views > 1000 ? d.Views / 1000 : d.Views}
                        </span>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
};
