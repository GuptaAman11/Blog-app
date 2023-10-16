import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Your Logo</div>
        <div className="md:hidden">
          <button
            className="text-white text-2xl"
            onClick={toggleMenu}
          >
            {isOpen ? 'X' : '☰'}
          </button>
        </div>
        <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex space-x-4">
            <li><a href="#" className="text-white">Home</a></li>
            <li><a href="#" className="text-white">About</a></li>
            <li><a href="#" className="text-white">Services</a></li>
            <li><a href="#" className="text-white">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
