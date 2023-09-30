import logo from './logo.svg';
import './App.css';

import Main from './component/Login/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './component/Home/Home';
import CommentForm from './component/Commentpage/Commentform';
import Commentcard from './component/Commentpage/Commentcard';


function App() {
  return (

    <Router>
      
        <Routes>
          <Route path='/login' element={<Main /> } />
          <Route path='/' element={<Home />} />
          <Route path='/comment' element={<Commentcard />} />
        </Routes>
      
    </Router>

  
  );
}

export default App;

