import React from 'react'
import { DataContext } from "../context/DataProvider.jsx";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from '../Loader/loader.js';
import { BASEURL } from '../../BASEURL.js';
import './Order.css';

const ProductImages = require.context("../../Images/display");



const fun=(data)=>{
// console.log(data);
const promise = new Promise((resolve, reject) => {
  fetch(`${BASEURL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // authorization: getAccessToken()
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resolve(data.data);
    })
    .catch((error) => {
      reject(error);
    });
});
return promise;

}



export default function Order() {

const { UserData, setUserData } = React.useContext(DataContext);

if (UserData) {
  
  return (
    <div className='Main_Div'>
    
  {<Orderhistory data={UserData} />}

    </div>    
  )
}
}



const Orderhistory=({data})=>{

  const [realdata,setrealdata]=React.useState([]);
  const [dateCheck,setDataCheck]=React.useState([]);

  React.useEffect(() => {
    fun(data).then((paydata) => {
      console.log(paydata);
      setrealdata(paydata.data)
      setDataCheck(paydata.date)
        });
  }, [data]);
//  console.log(dateCheck)

const cleardisplay=(key)=>{
let datetime="";
for(let i=0;i<key.length;i++)
{
  
    if(key[i]=='G')
    {
      break;
    }
    datetime+=key[i];
}

let date="",time="";
let idx=-1;
for(let i=0;i<datetime.length;i++)
{
  if(datetime[i]==':')
  {
        idx=i;
        break;
  }
}

 date=datetime.substring(0,idx-3);
 time=datetime.substring(idx-2,datetime.length);
 console.log(date);
 console.log(time);
const arr=[];

arr.push(date);
arr.push(time);

return arr;

}


const discountamount = (discount, original) => {
  let amount = original * (discount / 100);
  amount = Math.round(amount);
  return original - amount;
};
const x={

}
for (const key in dateCheck ) {
  if (dateCheck.hasOwnProperty(key)) {
    // console.log(`${key}: ${dateCheck[key]}`);
     var temp=[]
   dateCheck[key].forEach((ele)=>{
    realdata.map((d)=>{
      if(d._id===ele){
        temp.push(d);
      }
    })
   })
x[key]=temp;
  }
}
// console.log(x);

  return (
    <div
      className="styleproducts"
      style={{
        display: "flex",
        "flex-wrap": "wrap",
        justifyContent: "space-around",
        margin: "10px",
        width: "100%",
      }}
    >
      {Object.entries(x).map(([key, value]) => {
        return (
          <div className="OrdersDiv">
            <div className="date_heading">
              Date:{cleardisplay(key)[0]}{" "}
              <span className="displayTime">Time:{cleardisplay(key)[1]} </span>
            </div>

            <div key={key} className="OrderDataDiv">
              {value.map((d) => {
                return (
                  <div className="product-map-container">
                    <Link // <-- use Link component
                      to={`/Display/${d._id}`}
                      state={d} // <-- pass item object in state
                      className="LinkCSS"
                    >
                      <Card>
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

                            <div></div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {Object.entries(x).length === 0 && <Loader />}
    </div>
  );







}
