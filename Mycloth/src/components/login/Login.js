import React from "react";
import { useNavigate } from "react-router-dom"; //// used for navigation from one page to another
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAccessToken } from "../../utils/common-utils";
import { DataContext } from "../context/DataProvider.jsx";
import { BASEURL } from "../../BASEURL";
import { SocialIcon } from "react-social-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const { isUserAuthenticated, setUserData } = React.useContext(DataContext);
  const navigate = useNavigate();

  const signupintialvalues = {
    name: "",
    email: "",
    password: "",
    mobileno: "",
  };
  const logininitialvalues = {
    email: "",
    password: "",
  };

  const [account, toggleaccount] = React.useState("login");
  const [signup, setsignup] = React.useState(signupintialvalues);
  const [message, setMessage] = React.useState("");
  const [login, setlogin] = React.useState(logininitialvalues);

  const togglesignup = () => {
    if (account === "signup") {
      toggleaccount("login");
    } else {
      toggleaccount("signup");
    }
    setMessage("");
    setlogin(logininitialvalues);
    setsignup(signupintialvalues);
  };

  const inputchange = (e) => {
    // console.log(e.target.name,e.target.value);
    setsignup({ ...signup, [e.target.name]: e.target.value }); ///////// ... signup is used to append with intital values
  };

  const signupuser = () => {
    const data = signup;
    const pass = data.password;
    var specialchar = "!@$%&*()/";
    console.log(pass);
    if (pass.length < 8) {
      setMessage("password length must be atleast of 8 characters ");
      return;
    } else {
      var special = 0,
        num = 0,
        capital = 0,
        small = 0;

      for (var i = 0; i < pass.length; i++) {
        var val = pass[i];
        if (val >= "0" && val <= "9")
          // if character is a number
          num = 1;
        else if (specialchar.indexOf(val) != -1)
          special = 1; // special characters
        else if (val >= "A" && val <= "Z")
          //capital letters
          capital = 1;
        else if (val >= "a" && val <= "z") small = 1; // low case letters
      }

      if (special !== 1) {
        setMessage("please insert special characters in your password!");
        return;
      }
      if (capital !== 1) {
        setMessage("please insert any upper case letters in your password!");
        return;
      }
      if (small !== 1) {
        setMessage("please insert any lower case letters in your password!");
        return;
      }
      if (num !== 1) {
        setMessage("please insert any integer in your password!");
        return;
      }
    }
    toast("Please wait while we respond to  your request !!");
    fetch(`${BASEURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success) {
          togglesignup("login");
          setsignup(signupintialvalues);
          toast("Account SuccessFully Added!");
          signInClick();
          setMessage("");
        } else {
          setMessage(data.response);
          toast.error(data.response);
        }

        // setError('');
      })
      .catch((error) => {
        toast.error("Internal Server Error or Mobile number already exit");
        setMessage("Internal Server Error!");
      });
  };

  const onvaluechange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginuser = () => {
    const data = login;
    // alert("login karna h");
    console.log(login);
    fetch(`${BASEURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getAccessToken(),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          // alert("login toh hogaya tha");
          setsignup(logininitialvalues);
          isUserAuthenticated(true);
          sessionStorage.setItem("accessToken", `Bearer ${data.accesstoken}`);
          sessionStorage.setItem("refreshToken", `${data.refreshtoken}`);
          localStorage.setItem("accessToken", `Bearer ${data.accesstoken}`);
          localStorage.setItem("refreshToken", `${data.refreshtoken}`);
          setUserData(data.response);
          navigate("/");
        } else {
          // alert("kuch to gadbad h");
          setMessage(data.response);
        }
      })
      .catch((error) => {
        console.error(error);
        // setError('something went wrong! please try again later');
      });
  };

  /// insta wala kaand

  // signUpButton.addEventListener("click", () => {

  // });

  // signInButton.addEventListener("click", () => {
  //
  // });

  const signUpclick = () => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("containerLogin");
    container.classList.add("right-panel-active");
    document.getElementById("signInHide").classList.add("hideSignIn");
  };

  const signInClick = () => {
    const container = document.getElementById("containerLogin");
    container.classList.remove("right-panel-active");
    document.getElementById("signInHide").classList.remove("hideSignIn");
  };
  const signUpclickMobile = () => {
    document
      .getElementsByClassName("overlay-left")
      .classList.add("hideDisplay");
  };
  return (
    // <Container>
    //   <Row>
    //     {account === "login" ? (
    //       <div className="first">
    //         <div className="second">
    //           <div>{message}</div>
    //           <input
    //             type="textfield"
    //             className="inputfeild"
    //             variant="standard"
    //             onChange={(e) => onvaluechange(e)}
    //             name="email"
    //             placeholder="Enter your email"
    //           />
    //           <input
    //             type="textfield"
    //             className="inputfeild"
    //             variant="standard"
    //             onChange={(e) => onvaluechange(e)}
    //             name="password"
    //             placeholder="Enter Password"
    //           />
    //           <div className="buttondiv">
    //             <Button
    //               style={{ background: "black" }}
    //               className="inputfeild buttons"
    //               variant="contained"
    //               onClick={loginuser}
    //             >
    //               Login
    //             </Button>
    //           </div>

    //           <div className="orLineDiv">
    //             <hr className="dash-line" /> <span className="or">OR</span>{" "}
    //             <hr className="dash-line" />
    //           </div>
    //           <div className="buttondiv">
    //             <Button
    //               style={{ background: "black" }}
    //               className="inputfeild buttons"
    //               variant="contained"
    //               onClick={() => togglesignup()}
    //             >
    //               Create an account
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="first">
    //         <div className="second">
    //           <div>{message}</div>
    //           <input
    //             type="text"
    //             className="inputfeild"
    //             variant="standard"
    //             name="name"
    //             onChange={(e) => inputchange(e)}
    //             placeholder="Enter Name"
    //           />
    //           <input
    //             type="email"
    //             className="inputfeild"
    //             variant="standard"
    //             name="email"
    //             onChange={(e) => inputchange(e)}
    //             placeholder="Enter Email id"
    //           />
    //           <input
    //             type="password"
    //             className="inputfeild"
    //             variant="standard"
    //             name="password"
    //             onChange={(e) => inputchange(e)}
    //             placeholder="Enter Password"
    //           />
    //           <input
    //             type="text"
    //             className="inputfeild"
    //             variant="standard"
    //             name="mobileno"
    //             onChange={(e) => inputchange(e)}
    //             placeholder="Enter mobile no."
    //           />

    //           <div className="buttondiv">
    //             <Button
    //               style={{ background: "black" }}
    //               className="inputfeild buttons"
    //               variant="contained"
    //               onClick={() => signupuser()}
    //             >
    //               SignUp
    //             </Button>
    //           </div>
    //           <div className="orLineDiv">
    //             <hr className="dash-line" /> <span className="or">OR</span>{" "}
    //             <hr className="dash-line" />
    //           </div>
    //           <div className="buttondiv">
    //             <Button
    //               style={{ background: "black" }}
    //               className="inputfeild buttons"
    //               variant="contained"
    //               onClick={() => togglesignup()}
    //             >
    //               Already have an account
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </Row>
    // </Container>

    /// insta wala kaand

    <Container>
      <Row className="containerLogin Main_Container" id="containerLogin">
        <Col>
          <div className="form-container sign-up-container">
            <form>
              <h1 className="loginHeading">Create Account</h1>
              <div className="social-container">
                {/* <i className="fab fa-facebook-f"></i> */}
                <SocialIcon
                  style={{ overflow: "visible" }}
                  url="https://google.com/"
                  className="seticon"
                />

                <SocialIcon
                  style={{ overflow: "visible" }}
                  url="https://twitter.com/"
                  className="seticon"
                />
              </div>
              <span> or use your email for registration</span>
              <div>{message}</div>
              <input
                className="loginInput"
                type="text"
                name="name"
                onChange={(e) => inputchange(e)}
                placeholder="Name"
              />
              <input
                className="loginInput"
                type="email"
                name="email"
                onChange={(e) => inputchange(e)}
                placeholder="Email"
              />
              <input
                className="loginInput"
                type="password"
                name="password"
                onChange={(e) => inputchange(e)}
                placeholder="Password"
              />
              <input
                className="loginInput"
                type="number"
                name="mobileno"
                onChange={(e) => inputchange(e)}
                placeholder="Mobile No."
              />
              <button
                type="button"
                className="buttonLogin"
                onClick={() => signupuser()}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container" id="signInHide">
            <div className="form">
              <h1 className="loginHeading">Sign in</h1>
              <div className="social container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <div>{message}</div>
              <input
                className="loginInput"
                type="textfield"
                variant="standard"
                onChange={(e) => onvaluechange(e)}
                name="email"
                placeholder="Enter your email"
              />
              <input
                className="loginInput"
                variant="standard"
                onChange={(e) => onvaluechange(e)}
                name="password"
                placeholder="Enter Password"
              />
              <a href="#">Forgot your password ?</a>

              <button className="buttonLogin" type="button" onClick={loginuser}>
                {" "}
                Sign IN{" "}
              </button>

              <button
                className="ghost buttonLogin mobileSignupButton"
                id="signup"
                onClick={() => signUpclick()}
              >
                Sign-Up
              </button>
            </div>
          </div>
        </Col>
        <Col>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="loginHeading"> Welcome Back </h1>
                <p className="para">
                  {" "}
                  To keep connected with us please login with your personal
                  details{" "}
                </p>

                <button
                  className="ghost buttonLogin"
                  id="signIn"
                  onClick={signInClick}
                >
                  Sign-In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="loginHeading"> Hi There!</h1>
                <p>Enter your personal details to open an account with us</p>
                <button
                  className="ghost buttonLogin"
                  id="signup"
                  onClick={signUpclick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default Login;
