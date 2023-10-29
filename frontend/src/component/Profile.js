import React from 'react'
// import {Link} from 'react-router-dom'
// import { useSelector } from 'react-dom'
import {Row, Col,Button, Form} from "react-bootstrap"
// import { useDispatch,useSelector } from "react-redux";
// import { useState } from 'react';

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [PIC,setPic] = useState();
//   const [password, setPassword] = useState(""); 
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [picMessage, setPicMessage] = useState();


// const dispatch = useDispatch();

// const userLogin = useSelector((state) => state.userLogin);
// const { userInfo } = userLogin;

// const userUpdate = useSelector((state) => state.userUpdate);
// const { loading, error, success } = userUpdate;

function Profile() {
  const url="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw099SrW63uhLKTSuVMzp1XM&ust=1696859381022000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiw5fjL5oEDFQAAAAAdAAAAABAE.png"
  return (
    
    <div>
      
      
      <h1 className='primary'>My Profile</h1>
      <img className='imgstyle' alt='profile' src= {url}></img>
      <Row className='profileContainer'>

        <Col md={6}> 
        <Form>
          <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            // value={name}
            // onChange={(e) => setName(e.target.value)} 
           ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)} 
           ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)} 
           ></Form.Control>
          </Form.Group>

          <Form.Group controlId="ConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)} 
           ></Form.Control>
          </Form.Group>

          <Form.Group controlId="PIC">
          <Form.Label>Set Profile Picture</Form.Label>
          {/* <Form.File
           // onChange={(e) => postDetails(e.target.files[0])} 
          //  id="custom-file"
          //  type="image/png"
          //  label="Upload Profile Picture"
          //  custom
           ></Form.File> */}
          </Form.Group>

          
          <Button className='Button' type="submit" variant="primary">
            Update
          </Button>
          
           </Form>
        </Col>
        
       <Col> 
        {/* <img src={PIC} alt={name} className="profilePic" /> */}
        </Col>
      </Row>

      
    </div>
  )
}
// }

export default Profile
