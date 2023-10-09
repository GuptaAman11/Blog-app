import logo from './logo.svg';
import './App.css';

import Main from './component/Login/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './component/Home/Home';

import Blogview from './component/BlogView/Blogview';
import Profile from './component/Profile'

function App() {
  return (

    <Router>
      
        <Routes>
          <Route path='/login' element={<Main /> } />
          <Route path='/' element={<Home />} />
        
          <Route path='/blogview/:postId' element={<Blogview />} />
          <Route path='Profile' element={<Profile/>} />
         
        </Routes>
      
    </Router>

  
  );
}

export default App;

