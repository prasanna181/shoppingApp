import React from 'react';
import './Success.css'
import { DataContext } from "../context/DataProvider.jsx";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'; 
import { BASEURL } from "../../BASEURL";
const ProductImages = require.context("../../Images/display");



const updataUserDetailFromServer=(data,product)=>{

  const datasend={
    data:data,
    product:product
  }
  console.log(datasend)
  const promise=new Promise((resolve,reject)=>{
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
  })
  return promise;
}




export default function Success(){
    const { UserData } = React.useContext(DataContext);
 
    const InitialData = {
      name: UserData.name,
      address: "",
      number: UserData.mobileno,
      email: UserData.email,
    };


   
     const [filter, setFilter] = React.useState([]);
     const [product, setproduct] = React.useState([]);
  var productData = [];
     React.useEffect(() => {
       if (UserData) {
        setproduct(UserData.addtocart);

  const checkFilterSaveForLater = (key, arr) => {
    var flag = true;
    arr.forEach((data) => {
      if (data._id === key) {
        flag = false;
      }
    });
    return flag;
  };

  if (UserData.addtocart) {
    productData = UserData.addtocart.filter((item) => {
      return checkFilterSaveForLater(item._id, filter);
    });
  }
  if (productData) updataUserDetailFromServer(UserData, productData);

       }
     }, [UserData]);
   
return(
<Fun />
 )
}
const Fun=()=>{
     return (
    <div className="SuccessSuccessbody">
      <div class="suceessoverlay"></div>

      <div class="successtext">
        <div class="successwrapper">
          <div id="L" class="successletter">
            T
          </div>
          <div class="shadow">T</div>
        </div>
        <div class="successwrapper">
          <div id="I" class="successletter">
            H
          </div>
          <div class="shadow">H</div>
        </div>
        <div class="successwrapper">
          <div id="G" class="successletter">
            A
          </div>
          <div class="shadow">A</div>
        </div>
        <div class="successwrapper">
          <div id="H" class="successletter">
            N
          </div>
          <div class="shadow">N</div>
        </div>
        <div class="successwrapper">
          <div id="T" class="successletter">
            K
          </div>
          <div class="shadow">K</div>
        </div>
        <div class="successwrapper">
          <div id="N" class="successletter">
            -
          </div>
          <div class="shadow">-</div>
        </div>
        <div class="successwrapper">
          <div id="E" class="successletter">
            Y
          </div>
          <div class="shadow">Y</div>
        </div>
        <div class="successwrapper">
          <div id="S" class="successletter">
            O
          </div>
          <div class="shadow">O</div>
        </div>
        <div class="successwrapper">
          <div id="Stwo" class="successletter">
            U
          </div>
          <div class="shadow">U</div>
        </div>
      </div>
     
    </div>
  );
}