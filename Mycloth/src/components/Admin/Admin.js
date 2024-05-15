import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faShoppingCart,
  faEye,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const ProductImages = require.context("../../Images/display");
const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const discountamount = (discount, original) => {
    let amount = original * (discount / 100);
    amount = Math.round(amount);
    return original - amount;
  };

  const allData = async () => {
    try {
      await axios.get("http://localhost:8000/Men").then((res) => {
        // console.log(res.data.data, ".......from admin");
        setData(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          backgroundColor: "#240A34",
          color: "white",
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
        }}
      >
        <FontAwesomeIcon icon={faUser} />
        <Typography sx={{ marginLeft: "7px" }}>Admin</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button
            sx={{ color: "white" }}
            onClick={() => navigate("/Admin/add")}
          >
            {" "}
            Add
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={() => navigate("/Admin/update")}
          >
            {" "}
            Update
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={() => navigate("/Admin/delete")}
          >
            {" "}
            Delete
          </Button>
        </Box>
      </Box>

      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          justifyContent: "flex-start",
          "justify-content": "center",
        }}
      >
        {data.map((d) => {
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
