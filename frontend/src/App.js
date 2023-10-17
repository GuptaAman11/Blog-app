import logo from './logo.svg';
import './App.css';

import Main from './component/Login/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './component/Home/Home';

import Blogview from './component/BlogView/Blogview';
import Profile from './component/Profile'
import UpdatePost from './component/Home/UpdatePost';
import Navbar from './component/Home/Navbar';
// import CategroyWisePost from './component/Home/CategroyWisePost';


function App() {
  return (

    

    <div>

      <div>
        <Navbar/>
      </div>
      <Router>
        
      
        <Routes>
          <Route path='/login' element={<Main /> } />
          <Route path='/' element={<Home />} />
        
          <Route path='/blogview/:postId' element={<Blogview />} />

          <Route path='/Profile' element={<Profile/>} />
        
          <Route path='/update/:postId' element={<UpdatePost />} />
          {/* <Route path='/catpost' element={<CategroyWisePost />} /> */}
        </Routes>
      
    </Router>
    </div>

  
  );
}

export default App;

