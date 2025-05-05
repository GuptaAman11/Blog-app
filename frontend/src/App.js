import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './component/Home/Navbar';
import ShowNavBar from './component/Home/ShowNavbar/ShowNavBar';
import Authe from './component/Home/utils/Authe';

import Home from './component/Home/Home';
import Blogview from './component/BlogView/Blogview';
import Profile from './component/Profile';
import UpdatePost from './component/Home/UpdatePost';
import About from './component/About';
import Signup from './component/Login/Signup';
import Login1 from './component/Login/Login1';
import TrendingBlogs from './component/Home/TrendingBlogs';
import EmailVerify from './component/Home/EmailVerify/EmailVerify';

function App() {
  const [searchQuery , setSearchQuery] =useState("") ;

  return (
    <div>
      <ToastContainer />
      <Router>
        <ShowNavBar>
          <Navbar setSearchQuery = {setSearchQuery} />
        </ShowNavBar>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login1 />} />
          <Route path='/verify/:token' element={<EmailVerify />} />


          {/* Protected Routes */}
          <Route element={<Authe />}>
            <Route path='/home' element={<Home searchQuery = {searchQuery}/>}  />
            <Route path='/blogview/:postId' element={<Blogview />} />
            <Route path='/profile/:userId' element={<Profile />} searchQuery = {searchQuery} />
            <Route path='/trends' element={<TrendingBlogs />} />
            <Route path='/update/:postId' element={<UpdatePost />} />
            <Route path='/about' element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
