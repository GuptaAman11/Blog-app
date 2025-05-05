import React from 'react'
import { useNavigate ,NavLink, Link } from 'react-router-dom';
import { useInfoSupplier } from '../../context/AuthContext';

const Navbar = ({ setSearchQuery }) => {

  const {userinfo , setUserinfo} = useInfoSupplier()
  const navigate = useNavigate()
  // Add state for mobile menu
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    if (window.searchTimeout) clearTimeout(window.searchTimeout);

    window.searchTimeout = setTimeout(() => {
      setSearchQuery(e.target.value)
    }, 1000)
  }

  const handleLogout = () => {
    
    localStorage.removeItem('token')
    setUserinfo(null)
    setTimeout(() => navigate('/login'), 50);    

  };
  return (
    <div className='shadow-lg'>
     

     <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center">
              <img src="https://www.seekpng.com/png/detail/41-410093_male-symbol-png.png" className="h-8 mr-3" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">User</span>
          </a>
          
          {/* Search bar styles updated */}
          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            <div className="relative">
              <input
                onChange={handleSearch}
                type="search"
                className="w-full p-2.5 rounded-lg bg-white border border-gray-300"
                placeholder="Search..."
              />
              <button className="absolute right-2.5 top-2.5">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            {/* Mobile search bar */}
            <div className="p-4 md:hidden">
              <div className="relative">
                <input
                  onChange={handleSearch}
                  type="search"
                  className="w-full p-2.5 rounded-lg bg-white border border-gray-300"
                  placeholder="Search..."
                />
                {/* search icon */}
                <button className="absolute right-2.5 top-2.5">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Navigation menu */}
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <Link to={'/home'}>
                <li>
                  <a className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">Home</a>
                </li>
              </Link>
              <li>
                <NavLink to={"/about"} className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">About</NavLink>
              </li>
              <button className='bg-white border border-black p-1 text-sm rounded-md text-black' onClick={handleLogout}>LOGOUT</button>
            </ul>
          </div>
        </div>
      </nav>

 
    </div>
  )
}

export default Navbar