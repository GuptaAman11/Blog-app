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
<<<<<<< HEAD
import Signup from './component/Login/Signup';
// import CategroyWisePost from './component/Home/CategroyWisePost';
=======
>>>>>>> 66be699fb0eb6deca4dae107129bc6dcf962d98c


function App() {
  return (

    

    <div>
              <ToastContainer />


      <div>
        <Navbar/>
        
      </div>
      <Router>

        
      
        <Routes>
          <Route path='/login' element={<Main /> } />
          
          <Route path='/' element={<Home />} />
        
          <Route path='/blogview/:postId' element={<Blogview />} />

          <Route path='/Profile' element={<Profile/>} />
          
          <Route path='/About' element={<About /> } />
        
          <Route path='/update/:postId' element={<UpdatePost />} />
        </Routes>
      
    </Router>
    </div>

  
  );
}

export default App;

