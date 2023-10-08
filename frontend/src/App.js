import logo from './logo.svg';
import './App.css';

import Main from './component/Login/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './component/Home/Home';

import Blogview from './component/BlogView/Blogview';
import UpdatePost from './component/Home/UpdatePost';
import CategroyWisePost from './component/Home/CategroyWisePost';


function App() {
  return (

    <Router>
      
        <Routes>
          <Route path='/login' element={<Main /> } />
          <Route path='/' element={<Home />} />
        
          <Route path='/blogview/:postId' element={<Blogview />} />
          <Route path='/update/:postId' element={<UpdatePost />} />
          <Route path='/catpost' element={<CategroyWisePost />} />



        </Routes>
      
    </Router>

  
  );
}

export default App;

