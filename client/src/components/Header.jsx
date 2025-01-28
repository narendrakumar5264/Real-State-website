import React, { useState, useEffect } from 'react';
import {
  FaBars,
  FaUserEdit,
  FaListAlt,
  FaSignOutAlt, FaInfoCircle ,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuOpen && !event.target.closest('.relative')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold md:ml-10 text-blue-600">
          <span className='text-slate-800'>NK</span>Estate
        </Link>

        {/* Centered Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500 transition">
            About
          </Link>
          <Link to="/listing" className="text-gray-700 hover:text-blue-500 transition">
            Listings
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center ml-20 md:mr-9 gap-9">
          <Link to="/create-listing">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
              Sell/Rent
            </button>
          </Link>

          {currentUser ? (
            <div className="relative">
              <img
                onClick={toggleMenu}
                className="rounded-full h-8 w-8 object-cover cursor-pointer border-2 border-blue-500 hover:border-blue-700"
                src={currentUser.avatar}
                alt="profile"
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <ul className="text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                      <FaUserEdit className="text-blue-500" />
                      <Link to="/profile">Edit Profile</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                      <FaListAlt className="text-blue-500" />
                      <Link to="/listing">My Listings</Link>
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition">
                        <FaInfoCircle className="text-blue-500" />
                        <Link to="/about">About</Link>
                      </li>
                    <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                      <FaSignOutAlt className="text-red-500" />
                      <span onClick={handleSignOut} className="cursor-pointer">
                        Sign Out
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in" className="text-gray-700  hover:text-blue-500">
              LogIn 
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          
          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md rounded-b-lg">
              <ul className="flex flex-col gap-4 p-4">
                <Link to="/" className="text-gray-700 hover:text-blue-500">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-500">
                  About
                </Link>
                <Link to="/listing" className="text-gray-700 hover:text-blue-500">
                  Listings
                </Link>
                <Link to="/create-listing">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                    Sell/Rent
                  </button>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
