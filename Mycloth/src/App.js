// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import { Button } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

import { DataContext } from "./components/context/DataProvider.jsx";

import { getAccessToken } from "./utils/common-utils";
import { BASEURL } from "./BASEURL.js";

const BrowserTokenCheck = () => {
  const token = { token: `${getAccessToken()}` };
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/checktoken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: getAccessToken()
      },
      body: JSON.stringify(token),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
        // setError('something went wrong! please try again later');
      });
  });
  return promise;
};

function App() {
  const [showTopBotton, setShowTopBotton] = React.useState("none");
  const { isUserAuthenticated } = React.useContext(DataContext);
  const { setUserData } = React.useContext(DataContext);
  const toGoTop = () => {
    window.scroll(0, 0);
  };

  window.addEventListener(
    "scroll",
    function () {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > 500) {
        setShowTopBotton("inline");
      } else {
        setShowTopBotton("none");
      }
    },
    false
  );
  React.useEffect(() => {
    BrowserTokenCheck()
      .then((data) => {
        if (data.success === true) {
          isUserAuthenticated(true);
          setUserData(data.userdata[0]);
        }
      })
      .then((error) => {});
  }, []);

  return (
    <div>
      <div className="WithoutFooter">
        <Navbar />

        <div className="toGoTop" style={{ display: showTopBotton }}>
          <Button onClick={toGoTop}>
            <FontAwesomeIcon size="2x" color="black" icon={faUpLong} />{" "}
          </Button>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
