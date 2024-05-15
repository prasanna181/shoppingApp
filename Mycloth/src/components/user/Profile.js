import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';  
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BASEURL } from '../../BASEURL';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../Loader/loader';
import './Profile.css';
import Footer from '../Footer/Footer.js'
import { DataContext } from "../context/DataProvider.jsx";
import Logo from "../Navbar/logo1.png";

const updataFromServer=(data)=>{
  
 const promise = new Promise((resolve, reject) => {
   fetch(`${BASEURL}/profile`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
   })
     .then((response) => {
       if (response.success) alert("success");
       //  else alert("failure")
     })
     .then((data) => {
       resolve(data.data);
     })
     .catch((error) => {
       reject(error);
       // setError('something went wrong! please try again later');
     });
 });
 return promise;
}


const Profile=() =>{  
  const {isUserAuthenticated,UserData}= React.useContext(DataContext);
  console.log(isUserAuthenticated,UserData);
    const navigate = useNavigate();


    const logoutfun = () => {
    isUserAuthenticated(false);
    localStorage.removeItem('refreshToken')
    navigate("/Login");
  };
  return (
    <div>




  
      
   <Container className='Main_Container'>
          
  <Row>
    <UserDetail user={UserData} logout={logoutfun}/>
    <Col/>
  </Row>
 
</Container>

<ToastContainer/>

    

   
    </div>
  )
}
{/* <button onClick={()=>{navigate('/order')}}>Profile</button> */}
const UserDetail=({user,logout})=>{
 
    const [name,setName]=React.useState('');
    const [email,setEmail]=React.useState('');
    const [mobileno,setMobileno]=React.useState('');

    React.useState(()=>{
      if(user){
     setName(user.name);
     setEmail(user.email)
     setMobileno(user.mobileno)
      }
    })


    const updateData=()=>{
      console.log(user);
const id=user._id;

 const data={
  id:id,
  name:name,
  email:email,
  mobileno:mobileno
 }

updataFromServer(data);
toast("Successfully Added!")
logout();
    }

  

  return (
    <div>
      <h4>PROFILE</h4>
      <h6>Enter details to update the information. </h6>
      <Container>
    
        {(
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="forName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(ev) => {
                      setName(ev.target.value);
                    }}
                    value={name}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="forMobileNumber">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(ev) => {
                      setMobileno(ev.target.value);
                    }}
                    value={mobileno}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(ev) => {
                      setEmail(ev.target.value);
                    }}
                    value={email}
                  />
                  {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
                </Form.Group>

                <Button
                  className="submitButton"
                  variant="primary"
                  onClick={() => {
                    updateData();
                  }}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
export default Profile;