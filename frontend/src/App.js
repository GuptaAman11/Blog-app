import logo from './logo.svg';
import './App.css';

import Main from './component/Login/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './component/Home/Home';

function App() {
  return (

    <Router>
      
        <Routes>
          <Route path='/login' element={<Main /> } />
          <Route path='/' element={<Home />} />
        </Routes>
      
    </Router>

  
  );
}

export default App;

