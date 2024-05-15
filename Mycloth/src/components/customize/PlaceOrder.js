import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";

const PlaceOrder = ({ tshirtValues, eventTitle }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState({
    backtitle: "",
    fronttitle: "",
    color: "",
    customCharge: 100,
    tshirt: [],
  });

  const apiCall = async () => {
    try {
      console.log(".............custom front api");
      await axios
        .post("http://localhost:8000/customisepayment", data)
        .then((res) => {
          console.log(res);
          console.log(res.data.success, res.data.url);
          if (res.data.success === true) {
            window.location = res.data.url;
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (d) => {
    console.log(d);

    setData({
      backtitle: d.btitle,
      color: d.color,
      fronttitle: eventTitle,
      tshirt: tshirtValues,
      customCharge: 100,
    });
  };

  useEffect(() => {
    if (data.color) apiCall();
  }, [data]);

  //   console.log(data);

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="loginHeading">Place Order</h1>

        <input
          className="loginInput"
          type="text"
          {...register("color", {
            required: "color should be provided.",
          })}
          placeholder="Color"
        />
        <ErrorMessage
          render={({ message }) => (
            <p className="text-red-500 text-sm">{message}</p>
          )}
          errors={errors}
          name="color"
        />
        <input
          className="loginInput"
          type="text"
          placeholder="Add Back title"
          {...register("btitle", {})}
        />
        <ErrorMessage
          render={({ message }) => (
            <p className="text-red-500 text-sm">{message}</p>
          )}
          errors={errors}
          name="btitle"
        />

        <button
          type="submit"
          className="buttonLogin"
          // onClick={() => signupuser()}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
