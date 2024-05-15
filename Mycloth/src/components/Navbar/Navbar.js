import React from "react";
import Home from "../Home/Home.js";
import "./Navbar.css";

import Men from "../Men/Men.js";
import Women from "../Women/Women.js";
import Kids from "../Kids/Kids.js";
import Cart from "../Cart/Cart.js";
import Login from "../login/Login.js";
import TempLogin from "../login/TempLogin.js";
import Profile from "../user/Profile.js";
import Order from "../user/Order.js";
import Wishlist from "../user/Wishlist.js";
import Badge from "react-bootstrap/Badge";
import Payment from "../payment/Payment.js";
import Success from "../payment/Success.js";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHomeUser,
  faRightFromBracket,
  faUser,
  faPowerOff,
  faToggleOn,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./logo1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Display from "../Display/Display.js";
import { Navigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DataProvider from "../context/DataProvider.jsx";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider.jsx";
import { getAccessToken } from "../../utils/common-utils";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Admin from "../Admin/Admin.js";
import Customise from "../customize/Customise.js";
import Add from "../Admin/Add.js";
import Update from "../Admin/Update.js";
import Delete from "../Admin/Delete.js";

function Navbarfun() {
  const { isAuthenticated, isUserAuthenticated } =
    React.useContext(DataContext);
  const { UserData, setUserData } = React.useContext(DataContext);

  return (
    <div>
      <BrowserRouter>
        <NavBarItem
          isAuthenticated={isAuthenticated}
          isUserAuthenticated={isUserAuthenticated}
        />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Men" element={<Men />} />
          <Route exact path="/Women" element={<Women />} />
          <Route exact path="/Kids" element={<Kids />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route
            exact
            path="/Success"
            element={<Success UserData={UserData} />}
          />
          <Route exact path="/Display/:productCode" element={<Display />} />
          {/* <Route exact path="/Login" element={<Login />} /> */}
          <Route exact path="/Login" element={<TempLogin />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/order" element={<Order />} />
          <Route
            exact
            path="/wishlist"
            element={<Wishlist UserData={UserData} />}
          />
          <Route
            exact
            path="/Payment"
            element={<Payment UserData={UserData} />}
          />
          {UserData.email === "Admin123@gmail.com" && (
            <Route exact path="/Admin" element={<Admin />} />
          )}
          <Route exact path="/Admin/add" element={<Add />} />
          <Route exact path="/Admin/update" element={<Update />} />
          <Route exact path="/Admin/delete" element={<Delete />} />
          <Route exact path="/customise" element={<Customise />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const NavBarItem = ({ isAuthenticated, isUserAuthenticated }) => {
  const { setproduct, product } = React.useContext(DataContext);
  const [darkMode, setDarkMode] = React.useState(false);
  const { backgroundColor, setBackgorundColor } = React.useContext(DataContext);
  const navigate = useNavigate();
  const bringtohome = () => {
    <Navigate replace to="/" />;
  };

  const logoutfun = () => {
    isUserAuthenticated(false);
    localStorage.removeItem("refreshToken");
    navigate("/Login");
  };
  const handleBackground = (e) => {
    let value = e.target.id;
    if (value === "dark") {
      setDarkMode(false);
      setBackgorundColor({ background: "#f1f3f6", color: "black" });
    } else {
      setDarkMode(true);
      setBackgorundColor({ background: "rgb(26 26 26)", color: "white" });
    }
  };

  const collapseButton = () => {
    const ele = document.getElementById("offcanvasNavbar-expand-false");
    ele.css("visibility", "collapse");
  };

  const location = useLocation();

  if (
    location.pathname === "/Admin" ||
    location.pathname === "/Admin/add" ||
    location.pathname === "/Admin/update" ||
    location.pathname === "/Admin/delete"
  ) {
    return null;
  } else {
    return (
      <div className="comDiv">
        <div className="Navbar-container forLaptop">
          <Link className="NavbarItem" to="/">
            <img onClick={bringtohome()} src={Logo} alt="" className="logo" />
          </Link>

          <div className="Link">
            <Link className="NavbarItem" to="/">
              Home
            </Link>

            <Link className="NavbarItem" to="/Men">
              Men
            </Link>
            <Link className="NavbarItem" to="/Women">
              Women
            </Link>

            <Link className="NavbarItem" to="/Kids">
              Kids
            </Link>
            <Link className="NavbarItem" to="/customise">
              Customise Tshirts
            </Link>

            {darkMode && (
              <FontAwesomeIcon
                id="dark"
                onClick={handleBackground}
                icon={faToggleOn}
              />
            )}
            {!darkMode && (
              <FontAwesomeIcon
                id="light"
                onClick={handleBackground}
                icon={faToggleOff}
              />
            )}
          </div>
          <div className="nav LaptopAuthDiv">
            {isAuthenticated === false && (
              <Link className="login" to="/Login">
                <div className="loginDiv">
                  <FontAwesomeIcon
                    title="login/signup"
                    icon={faRightFromBracket}
                  />
                </div>
              </Link>
            )}

            {isAuthenticated && (
              <Dropdown className=" Dropout loginDiv">
                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <Dropdown.Item href="#/action-2">My Profile</Dropdown.Item>
                  </Link>
                  <Link to="/order" style={{ textDecoration: "none" }}>
                    <Dropdown.Item href="#/action-3">Order</Dropdown.Item>
                  </Link>
                  <Link to="/wishlist" style={{ textDecoration: "none" }}>
                    <Dropdown.Item href="#/action-1">Wishlist</Dropdown.Item>
                  </Link>

                  <Dropdown.Item onClick={logoutfun}>
                    Logout <FontAwesomeIcon title="Logout" icon={faPowerOff} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {isAuthenticated && (
              <Link className="NavbarItem" to="/Cart">
                <div className="shopCart">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="shoppingCart"
                  />
                  <span className="badge">
                    {" "}
                    {product.length !== 0 && (
                      <Badge style={{ fontSize: "8px" }} bg="secondary">
                        {product.length}
                      </Badge>
                    )}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="forMobile forMobileNav">
          {[false].map((expand) => (
            <Navbar key={expand} bg="light" expand={expand} className="mb-3">
              <Container fluid>
                <Navbar.Brand>
                  {isAuthenticated && (
                    <Link className="NavbarItem" to="/Cart">
                      <div className="shopCart">
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="shoppingCart"
                        />
                        <span className="mobilebadge">
                          {" "}
                          {product.length !== 0 && (
                            <Badge style={{ fontSize: "8px" }} bg="secondary">
                              {product.length}
                            </Badge>
                          )}
                        </span>
                      </div>
                    </Link>
                  )}
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      MY SHOP
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Link className="NavbarItem" to="/">
                        Home
                      </Link>
                      <Link className="NavbarItem" to="/Men">
                        Men
                      </Link>
                      <Link className="NavbarItem" to="/Women">
                        Women
                      </Link>

                      <Link className="NavbarItem" to="/Kids">
                        Kids
                      </Link>
                      <Link className="NavbarItem" to="/customise">
                        Customise Tshirts
                      </Link>

                      {isAuthenticated === false && (
                        <Link className="login" to="/Login">
                          <div className="loginDiv">
                            <FontAwesomeIcon
                              title="login/signup"
                              icon={faRightFromBracket}
                            />
                          </div>
                        </Link>
                      )}
                      {isAuthenticated && (
                        <Dropdown className="forMobileDropDown Dropout loginDiv">
                          <Dropdown.Toggle
                            style={{ width: "100%" }}
                            variant="Secondary"
                            id="dropdown-basic"
                          >
                            <FontAwesomeIcon icon={faUser} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Link
                              to="/profile"
                              style={{ textDecoration: "none" }}
                            >
                              <Dropdown.Item href="#/action-3">
                                My Profile
                              </Dropdown.Item>
                            </Link>
                            <Link
                              to="/order"
                              //  onClick={()=>{expand(false);}}
                              style={{ textDecoration: "none" }}
                            >
                              <Dropdown.Item href="#/action-3">
                                Order
                              </Dropdown.Item>
                            </Link>
                            <Link
                              to="/wishlist"
                              style={{ textDecoration: "none" }}
                            >
                              <Dropdown.Item href="#/action-1">
                                Wishlist
                              </Dropdown.Item>
                            </Link>

                            <Dropdown.Item onClick={logoutfun}>
                              Logout{" "}
                              <FontAwesomeIcon
                                title="Logout"
                                icon={faPowerOff}
                              />
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </div>
      </div>
    );
  }
};

export default Navbarfun;

///  account cart men women kids home search-bar
