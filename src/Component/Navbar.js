import React, { useState } from 'react'

import navlogo from "./../Assets/Image/navlogo.png";
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      setIsMenuOpen((prev) => !prev);
    }
  return (
 
    <div>
          <nav className=" text-black nav-custom">
      <div className="max-w-6xl mx-auto px-2 navbar-custom-page">
        <div className="flex justify-between">
          <div className="flex space-x-4 w-7/12 justify-between">
            <div>
              <a href="#" className="flex items-center py-5 px-2 hover:text-gray-900">
             {/* <img src ={navlogo}/> */}
                <span className="font-bold navbar-heading-tittle">Team Password</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                Login 
              </a>
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                Signup
              </a> 
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
         
            <a
              href=""
              className="py-2 px-3 bg-green-500 hover:bg-green-300 text-white hover:text-white rounded transition duration-300"
            >
              Get Started
            </a>
          </div> 

          <div className="md:hidden flex items-center">
            <button onClick={handleMenuToggle} className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu md:hidden">
          <div className='flex flex-col' >
          <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                Login 
              </a>
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                Signup
              </a> 
            </div>
        </div>
      )}
    </nav>
    </div>
  )
}

export default Navbar