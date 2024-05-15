import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faEye,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Drawer from "./Drawer.js";
import PlaceOrder from "./PlaceOrder.js";

const ProductImages = require.context("../../Images/display");

const Customise = () => {
  const [tshirtData, setTshirtData] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [tshirtValues, setTshirtValues] = useState([]);
  const apifun = async () => {
    try {
      const res = await axios.get("http://localhost:8000/gettshirtdata");
      // console.log(res.data.data);
      setTshirtData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const discountamount = (discount, original) => {
    let amount = original * (discount / 100);
    amount = Math.round(amount);
    return original - amount;
  };

  useEffect(() => {
    apifun();
  }, []);

  // console.log(tshirtValues, eventTitle);

  return (
    <div
      className="styleproducts"
      style={{
        margin: "90px",
      }}
    >
      <Drawer setEventTitle={setEventTitle} />
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          justifyContent: "flex-start",
          "justify-content": "center",
        }}
      >
        {tshirtData.map((d) => {
          return (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <div style={{ margin: "5px" }}>
                <Link // <-- use Link component
                  to={`/Display/${d._id}`}
                  state={d} // <-- pass item object in state
                  className="LinkCSS"
                >
                  <Card
                    className="Card-Container"
                    style={{ borderRadius: "30px" }}
                  >
                    <Card.Img
                      style={{ height: "16rem", borderRadius: "16px" }}
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
                            <span className="shopingCart">
                              <FontAwesomeIcon icon={faShoppingCart} />
                            </span>
                          </span>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    width: "50%",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "20px",
                  }}
                  onClick={() => setTshirtValues(d)}
                >
                  select
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {eventTitle && tshirtValues.length !== 0 && (
        <PlaceOrder tshirtValues={tshirtValues} eventTitle={eventTitle} />
      )}
    </div>
  );
};

export default Customise;
