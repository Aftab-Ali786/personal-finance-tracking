import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import logo from "../../assets/logo.svg"; 

const Navbar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setShowMenu(false)} 
      className={`block px-4 py-2 md:px-0 transition-colors ${location.pathname === to
          ? "text-blue-600 font-semibold"
          : "text-gray-700"
        } hover:text-blue-500`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-9 h-9" />
          <span className="font-bold text-xl text-gray-800">Expenses</span>
        </Link>
        <div className="hidden md:block text-gray-600 italic text-sm font-medium text-center">
          “Every saved coin plants tomorrow’s tree.”
        </div>
      
        <button
          className="text-2xl md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {showMenu ? <X size={26} /> : <Menu size={26} />}
        </button>

        
        <div
          className={`${showMenu ? "max-h-40" : "max-h-0"
            } md:max-h-none overflow-hidden md:flex md:items-center md:gap-6 absolute md:static top-14 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300`}
        >
          {navLink("/", "Home")}
          {navLink("/add", "Add Transaction")}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
