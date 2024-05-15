import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { Box, Button, TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Delete = () => {
  const [productId, setProductId] = useState("");

  const apiCall = async (productId) => {
    console.log("hello from delete admin api");
    console.log(productId);
    const data = [];
    data.push(productId);
    console.log(data);
    try {
      await axios
        .post("http://localhost:8000/deleteclothitem", data)
        .then((res) => {
          console.log(res);
          toast(" Item Deleted  Successfully");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    apiCall(productId);
  };

  return (
    <div>
      <AdminHeader />

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "#EABE6C",
          width: "100%",
          height: "100vh",
          margin: "auto",
          padding: "50px",
        }}
      >
        <TextField
          sx={{ width: "60%", color: "white" }}
          id="standard-basic"
          label="product Id"
          variant="standard"
          name="Pid"
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button
          sx={{ marginTop: "20px", width: "20%" }}
          variant="outlined"
          onClick={() => handleSubmit()}
        >
          Delete Item
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Delete;
