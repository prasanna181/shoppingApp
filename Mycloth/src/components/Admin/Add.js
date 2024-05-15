import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);
  const [discount, setDiscount] = useState("");
  const [color, setColor] = useState([]);
  const [categoryType, setCategoryType] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const [newItem, setNewItem] = useState({
    Category: "",
    Brands: "",
    Price: "",
    Size: [],
    Discount: "",
    Color: [],
    CategoryType: "",
    Image: [],
  });

  const navigate = useNavigate();

  const addItemApi = async () => {
    try {
      console.log("hello from frontend api");
      await axios
        .post("http://localhost:8000/addclothitem", newItem)
        .then((res) => {
          toast("item added Successfully");
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    setNewItem({
      Category: category,
      Brands: brands,
      Price: price,
      Size: size,
      Discount: discount,
      Color: color,
      CategoryType: categoryType,
      Image: selectedImages,
    });
  };

  const handleChangeSize = (e) => {
    console.log(e.target.name);
    console.log(e.target.checked);

    // setSize({ ...size, [e.target.name]});
    setSize((size) => [...size, e.target.name]);
  };

  const handleChangeColor = (e) => {
    console.log(e.target.name);
    console.log(e.target.checked);
    setColor((color) => [...color, e.target.name]);
    // setColor({ ...color, [e.target.name]: e.target.checked });
  };

  // const handleImageChange = (event) => {
  //   const files = event.target.files;
  //   const imagesArray = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       imagesArray.push(reader.result);
  //       if (imagesArray.length === files.length) {
  //         setSelectedImages([...selectedImages, ...imagesArray]);
  //       }
  //     };
  //     reader.readAsDataURL(files[i]);
  //   }
  // };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const fileNamesArray = [];

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      fileNamesArray.push(fileName);
    }

    setSelectedImages(fileNamesArray);
  };

  useEffect(() => {
    if (newItem.Image.length !== 0) addItemApi();
  }, [newItem]);

  console.log(newItem);

  return (
    <div>
      <AdminHeader />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
          label="Category (jeans,shirts)"
          variant="standard"
          name="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          sx={{ width: "60%" }}
          id="standard-basic"
          label="Brands"
          variant="standard"
          name="Brands"
          onChange={(e) => setBrands(e.target.value)}
        />
        <TextField
          sx={{ width: "60%" }}
          id="standard-basic"
          label="Price"
          variant="standard"
          name="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: "10px",
          }}
        >
          <Typography sx={{ marginRight: "10px" }}>Size Available: </Typography>
          <FormControlLabel
            control={
              <Checkbox name="S" onChange={(e) => handleChangeSize(e)} />
            }
            label="S"
          />
          <FormControlLabel
            control={
              <Checkbox name="M" onChange={(e) => handleChangeSize(e)} />
            }
            label="M"
          />
          <FormControlLabel
            control={
              <Checkbox name="L" onChange={(e) => handleChangeSize(e)} />
            }
            label="L"
          />
          <FormControlLabel
            control={
              <Checkbox name="XL" onChange={(e) => handleChangeSize(e)} />
            }
            label="XL"
          />
          <FormControlLabel
            control={
              <Checkbox name="2XL" onChange={(e) => handleChangeSize(e)} />
            }
            label="2XL"
          />
        </FormGroup>

        <TextField
          sx={{ width: "60%" }}
          id="standard-basic"
          label="Discount"
          variant="standard"
          name="Discount"
          onChange={(e) => setDiscount(e.target.value)}
        />
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: "10px",
          }}
        >
          <Typography sx={{ marginRight: "10px" }}>
            Colors Available:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox name="black" onChange={(e) => handleChangeColor(e)} />
            }
            label="black"
          />
          <FormControlLabel
            control={
              <Checkbox name="grey" onChange={(e) => handleChangeColor(e)} />
            }
            label="grey"
          />
          <FormControlLabel
            control={
              <Checkbox name="navy" onChange={(e) => handleChangeColor(e)} />
            }
            label="navy"
          />
          <FormControlLabel
            control={
              <Checkbox name="white" onChange={(e) => handleChangeColor(e)} />
            }
            label="white"
          />
        </FormGroup>
        <TextField
          sx={{ width: "60%" }}
          id="standard-basic"
          label="CategoryType (Topwear,Bottomwear)"
          variant="standard"
          name="CategoryType"
          onChange={(e) => setCategoryType(e.target.value)}
        />

        <Box sx={{ display: "flex", marginTop: "20px" }}>
          <Typography sx={{ marginRight: "20px", fontSize: "20px" }}>
            select Images
          </Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Box>
        <Button
          sx={{ marginTop: "20px" }}
          variant="outlined"
          onClick={() => handleSubmit()}
        >
          Enter New Item
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Add;
