import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./payment.css";
import { DataContext } from "../context/DataProvider.jsx";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../BASEURL";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
const ProductImages = require.context("../../Images/display");

const updataUserDetailFromServer = (data, product) => {
  const datasend = {
    data: data,
    product: product,
  };
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/Payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datasend),
    })
      .then((response) => {
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

const apitomakepayment = (data, product) => {
  console.log(product);
  if (product.length === 0) {
    // alert("product toh daal");
    return;
  }

  const datasend = { userData: data, product: product };
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datasend),
    })
      .then((response) => {
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

export default function Payment() {
  const { UserData } = React.useContext(DataContext);
  console.log(UserData);
  const InitialData = {
    name: UserData.name,
    address: "",
    number: UserData.mobileno,
    email: UserData.email,
  };

  const [payData, setPayData] = React.useState([{}]);
  const { setproduct, product } = React.useContext(DataContext);
  React.useEffect(() => {
    setPayData(InitialData);
  }, [UserData]);
  const payDataFun = (e) => {
    setPayData({ ...payData, [e.target.name]: e.target.value });
  };

  // console.log(payData);
  return (
    <div className="Main_container">
      <Container>
        <Row>
          <Col>
            <Paymentdetails
              data={UserData}
              payDataFun={payDataFun}
              product={product}
            />
            {/* </Col>
          <Col>
            <CardDetail data={payData} payDataFun={payDataFun} product={product}/> */}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

const Paymentdetails = ({ data, product, payDataFun }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [filter, setFilter] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      setFilter(data.saveForLater);
    }
  }, [data]);
  const checkFilterSaveForLater = (key, arr) => {
    var flag = true;
    arr.forEach((data) => {
      if (data._id === key) {
        flag = false;
      }
    });
    return flag;
  };
  const productData = product.filter((item) => {
    return checkFilterSaveForLater(item._id, filter);
  });
  const navigate = useNavigate();
  const makepayment = () => {
    apitomakepayment(data, productData).then((data) => {
      console.log(data);
      if (data.success === true) {
        window.location = data.url;
      }
    });
    //     updataUserDetailFromServer(data,product).then((success)=>{
    // toast("Payment Successfull!")
    // setTimeout(() => {
    //   navigate('/order')
    // }, 2000);

    //     }).catch(()=>{
    //       toast.error("Something Wrong,please Try agian!");
    //     })
  };
  const inputchange = (e) => {
    payDataFun(e);
  };

  return (
    <div class="body">
      <div>
        <h1 class="main_head"> Payment form</h1>
        <h2> Contact Details</h2>
        <p>
          <b>Name:</b>
          <input
            type="text"
            name="name"
            style={{ margin: "15px", padding: "8px" }}
            value={data.name}
            required
            placeholder="Enter your name"
            onChange={(e) => inputchange(e)}
          />
        </p>
        <p>
          <b>Address:</b>
          <textarea
            name="address"
            style={{ margin: "15px", padding: "8px" }}
            cols="10"
            rows="5"
            required
            placeholder="enter your address"
            onChange={(e) => inputchange(e)}
          >
            {" "}
          </textarea>
        </p>
        <p>
          {" "}
          <b> Email:</b>{" "}
          <input
            type="email"
            name="email"
            style={{ width: "500px", margin: "15px", padding: "8px" }}
            value={data.email}
            placeholder="xyz@gmail.com"
            onChange={(e) => inputchange(e)}
          />
        </p>{" "}
        <div style={{ display: "flex", "justify-content": "space-around" }}>
          <div>
            <b> Number:</b>{" "}
            <input
              value={data.mobileno}
              name="number"
              type="Number"
              style={{ margin: "15px", padding: "8px" }}
              onChange={(e) => inputchange(e)}
            />
          </div>

          <div class="pay_button">
            <input
              type="submit"
              style={{ margin: "15px", width: "100px" }}
              onClick={() => makepayment()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
