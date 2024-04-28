import logo from './logo.svg';
import './App.css';

import Main from './component/Login/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './component/Home/Home';

import Blogview from './component/BlogView/Blogview';
import Profile from './component/Profile'
import UpdatePost from './component/Home/UpdatePost';
import Navbar from './component/Home/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './component/About'
import Signup from './component/Login/Signup';
import Authe from './component/Home/utils/Authe';
import Login1 from './component/Login/Login1';
import TrendingBlogs from './component/Home/TrendingBlogs';
import ShowNavBar from './component/Home/ShowNavbar/ShowNavBar';
import EmailVerify from './component/Home/EmailVerify/EmailVerify';



function App() {
  return (

    

    <div>
              <ToastContainer />


     
      <Router>
      <div>
        <ShowNavBar>
          <Navbar />
        </ShowNavBar>
        
      </div>
        
      
        <Routes>



          <Route path='/login' element={<Login1 /> } />
          <Route path='/signup' element={<Signup /> } />

          <Route path='/home' element={<Home />} />

          
        
          <Route path='/home/blogview/:postId' element={<Blogview />} />

          <Route path='/Profile' element={<Profile/>} />
          <Route path='/trends' element={<TrendingBlogs />} />

          
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />

          <Route path='/update/:postId' element={<UpdatePost />} />

            <Route path='/about' element={<About /> } />


        </Routes>
      
    </Router>
    </div>

  
  );
}

export default App;

