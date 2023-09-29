import React, { useState } from "react";
    import "../../css/navbar.css";
    import { FaCaretDown,FaUser } from "react-icons/fa";

    const Navbar = () => {

        const [Categorydropdown,setCategorydropdown] = useState(false)
        return (
            <>
                <nav className="main-nav">
                    <div className="logo">
                        <h2>
                            <span>B</span>LOG
                        </h2>
                    </div>
                    <div className="menu-link">
                        <ul>
                            <li>
                                <a href="#">Home Page</a>
                            </li>
                            <li>
                                <a href="#">Categories</a>
                                <div className="dropdown-menu">
                                    {/* <button> */}
                                    <ul>
                                        <li><a href="#">Sports</a></li>
                                        <li><a href="#">Literature</a></li>
                                        <li><a href="#">Social</a></li>
                                    </ul>
                                    {/* </button> */}
                                    
                                </div>
                                <FaCaretDown />    
                            </li>
                            {/* <li>
                                <a href="#">Contact Us</a>
                            </li> */}
                            <li>
                                <a href="#">About</a>
                            </li>
                            <input type="search" placeholder="search" id="find"></input> 
                        </ul>
                    </div>
                    <div className="profile-menu">
                        <FaUser />
                    </div>
     
                    
                </nav>
                <section className="mysection">
                    <p>Welcome to</p>
                    <h1>BLOG WEBSITE</h1>
                </section>
            </>
        )
    }

    export default Navbar