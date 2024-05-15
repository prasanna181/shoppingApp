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
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Login = () => {
  const { isUserAuthenticated, setUserData } = React.useContext(DataContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    // console.log(data);
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

    reset();
  };

  const onvaluechange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginuser = () => {
    const data = login;
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
          console.log(data.response);
          if (data.response.email === "Admin123@gmail.com") {
            navigate("/Admin");
          } else {
            navigate("/");
          }
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
    <Container>
      <Row className="containerLogin Main_Container" id="containerLogin">
        <Col>
          <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="loginHeading">Create Account</h1>
              <div>{message}</div>
              <input
                className="loginInput"
                type="text"
                {...register("name", {
                  required: "Name should be provided.",
                  minLength: {
                    value: 3,
                    message: "Name must be greater than 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Name must be less than 20 characters",
                  },
                  pattern: {
                    value: /^([a-zA-Z ]){2,30}$/,
                    message: "Invalid name",
                  },
                })}
                placeholder="Name"
              />
              <ErrorMessage
                render={({ message }) => (
                  <p className="text-red-500 text-sm">{message}</p>
                )}
                errors={errors}
                name="name"
              />
              <input
                className="loginInput"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Valid email should be provided.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <ErrorMessage
                render={({ message }) => (
                  <p className="text-red-500 text-sm">{message}</p>
                )}
                errors={errors}
                name="email"
              />

              <input
                className="loginInput"
                type="password"
                {...register("password", {
                  required: "Valid password should be provided.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
                  },
                })}
                placeholder="Password"
              />
              <ErrorMessage
                render={({ message }) => (
                  <p className="text-red-500 text-sm">{message}</p>
                )}
                errors={errors}
                name="password"
              />
              <input
                className="loginInput"
                type="number"
                placeholder="Mobile No."
                {...register("mobileno", {
                  required: "Valid mobile no. should be provided.",
                  pattern: {
                    value: /^[0-9]{10}$/g,
                    message: "Invalid mobile no.",
                  },
                })}
              />
              <ErrorMessage
                render={({ message }) => (
                  <p className="text-red-500 text-sm">{message}</p>
                )}
                errors={errors}
                name="mobileno"
              />

              <button
                type="submit"
                className="buttonLogin"
                // onClick={() => signupuser()}
              >
                Sign Up
              </button>
            </form>
          </div>

          <div className="form-container sign-in-container" id="signInHide">
            <div className="form">
              <h1 className="loginHeading">Sign in</h1>
              <div>{message}</div>
              <input
                className="loginInput"
                type="text"
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
