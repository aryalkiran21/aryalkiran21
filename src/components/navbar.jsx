import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaTimes, FaBars } from 'react-icons/fa';
import apple from "../assets/apple.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative w-full py-2.5 px-10 bg-white shadow-md">
      <div className="mx-auto flex items-center justify-between max-w-screen-xl">
        <div className="flex items-center pl-5">
          <img src={apple} alt="Apple Logo" width={28} height={30} className="" />
        </div>
        {/* Desktop Responshive */}
        <ul className="hidden md:flex space-x-16 list-none items-center">
          <li><a href="#" className="text-black text-base font-medium hover:text-blue-600 transition-colors">STORE</a></li>
          <li><a href="#" className="text-black text-base font-medium hover:text-blue-600 transition-colors">MENS</a></li>
          <li><a href="#" className="text-black text-base font-medium hover:text-blue-600 transition-colors">WOMENS</a></li>
          <li><a href="#" className="text-black text-base font-medium hover:text-blue-600 transition-colors">KIDS</a></li>
          <li><a href="#" className="text-red-700 text-base font-medium hover:text-blue-600 transition-colors">BRANDS</a></li>
          <li><a href="#" className="text-black text-base font-medium hover:text-blue-600 transition-colors">OUTLET</a></li>
          <li><a href="#" className="text-black text-base font-medium hover:text-blue-600 transition-colors">Sign Up</a></li>
          <li><a href="#" className="text-black text-base font-medium hover:text-blue-600 transition-colors">Support</a></li>
        </ul>
        {/* Desktop Icons */}
        <div className="space-x-12 flex items-center pl-16">
          <button className="bg-transparent border-none text-gray-800 text-xl cursor-pointer hover:text-blue-600 transition-colors">
            <FaSearch />
          </button>
          <button className="bg-transparent border-none text-gray-800 text-xl cursor-pointer hover:text-blue-600 transition-colors">
            <FaShoppingCart />
          </button>
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 text-xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

    {/* Mobile Responshive */}
      {isMenuOpen && (
        <div className="fixed  z-50 bg-white flex flex-col items-center justify-center space-y-4 shadow-lg">
          <img src={apple} alt="Apple Logo" width={400} height={400} className="mb-6" />
          {/* Mobile Menu Items */}
          <ul className="flex flex-col items-center space-y-4">
            <li><a href="#" className="text-black text-lg font-medium hover:text-blue-600 transition-colors">STORE</a></li>
            <li><a href="#" className="text-black text-lg font-medium hover:text-blue-600 transition-colors">MENS</a></li>
            <li><a href="#" className="text-black text-lg font-medium hover:text-blue-600 transition-colors">WOMENS</a></li>
            <li><a href="#" className="text-black text-lg font-medium hover:text-blue-600 transition-colors">KIDS</a></li>
            <li><a href="#" className="text-red-700 text-lg font-medium hover:text-blue-600 transition-colors">BRANDS</a></li>
            <li><a href="#" className="text-black text-lg font-medium hover:text-blue-600 transition-colors">OUTLET</a></li>
            <li><a href="#" className="text-black text-lg font-medium hover:text-blue-600 transition-colors">Sign Up</a></li>
            <li><a href="#" className="text-black text-lg font-medium hover:text-blue-600 transition-colors">Support</a></li>
          </ul>

          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-800 text-xl"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
