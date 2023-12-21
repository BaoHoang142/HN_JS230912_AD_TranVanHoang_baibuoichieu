import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import publicAxios from "../config/publicAxios";
export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleGetValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  console.log(user);
  const handleLogin = async () => {
    if (!user.email || !user.password) {
      alert("Please enter email and password");
    } else {
        try {
            const response = await publicAxios.post("/auth/login", user);
            localStorage.setItem("token", response.data.token);
            alert(response.data.message);
            navigate("/todo");
        } catch (error) {
            alert(error.response.data.message)
            
        } 
    }
    
  };
  return (
    <>
      <div id="login">
        <div className="login__form">
          <div className="login__form--text">
            <div>
              <i style={{color:"#fff",fontWeight:"900",fontSize:"43px"}}>Login</i>
            </div>
            <div>
              <i style={{color:"#fff",fontWeight:"900",fontSize:"20px"}}>Merry Christmas</i>
            </div>
          </div>
          <MDBContainer className="p-3 my-5 d-flex flex-column w-50 " >
            <label htmlFor="" style={{color:"#fff",fontWeight:"900",fontSize:"14px",marginTop:"-20px"}}>Email</label>
            <MDBInput
              style={{color:"#fff",border:"2px solid #fff"}}
              wrapperClass="mb-4"
              
              id="form1"
              
              name="email"
              onChange={handleGetValue}
            />
            <label htmlFor="" style={{color:"#fff",fontWeight:"900",fontSize:"14px"}}>Password</label>
            <MDBInput
              wrapperClass="mb-4"
              style={{color:"#fff",border:"2px solid #fff"}}
              
              id="form2"
             
              name="password"
              onChange={handleGetValue}
            />
            <MDBBtn className="mb-4" style={{fontWeight:"800",fontSize:"18px"}} onClick={handleLogin}>
              Sign in
            </MDBBtn>
            
          </MDBContainer>
        </div>
        <div className="login__wish">
            <i className="login__wish--text">" May this holiday season sparkle and shine, may all of your wishes and dreams come true,
                <br /> 
                and may you feel this happiness all year round."
            </i>

        </div>
      </div>
    </>
  );
}
