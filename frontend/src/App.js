import logo from './logo.svg';
import './App.css';

import Main from './component/Login/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './component/Home/Home';

import Blogview from './component/BlogView/Blogview';
<<<<<<< HEAD
import Profile from './component/Profile'
=======
import UpdatePost from './component/Home/UpdatePost';
import CategroyWisePost from './component/Home/CategroyWisePost';

>>>>>>> 9f5433d0350003648c46e0a7f30c1a24fa3dcacb

function App() {
  return (

    <Router>
      
        <Routes>
          <Route path='/login' element={<Main /> } />
          <Route path='/' element={<Home />} />
        
          <Route path='/blogview/:postId' element={<Blogview />} />
<<<<<<< HEAD
          <Route path='Profile' element={<Profile/>} />
         
=======
          <Route path='/update/:postId' element={<UpdatePost />} />
          <Route path='/catpost' element={<CategroyWisePost />} />



>>>>>>> 9f5433d0350003648c46e0a7f30c1a24fa3dcacb
        </Routes>
      
    </Router>

  
  );
}

export default App;

