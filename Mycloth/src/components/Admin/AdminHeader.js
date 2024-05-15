import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
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
        <Typography
          sx={{
            marginLeft: "7px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            navigate("/Admin");
          }}
        >
          Admin
        </Typography>

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
    </div>
  );
};

export default AdminHeader;
