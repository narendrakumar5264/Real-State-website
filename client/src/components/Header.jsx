import React, { useState, useEffect } from 'react';
import { FaSearch, FaBars, FaUserEdit, FaListAlt, FaPhone, FaSignOutAlt, FaInfoCircle } from 'react-icons/fa';
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
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
      dispatch(deleteUserFailure(data.message));
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
    <header className="bg-white shadow-md md:m-4 md:ml-8 md:mr-8">
      <div className="flex justify-between items-center max-w-6xl mx-auto md:p-1 p-3">
        <Link to="/">
          <h1 className='font-bold text-2xl flex flex-wrap'>
            <span className='text-slate-500'>NK</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>

        <ul className="flex gap-6 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 relative group">
              <span className="group-hover:text-blue-500 transition-colors">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 relative group">
              <span className="group-hover:text-blue-500 transition-colors">About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
          <Link to="/listing">
            <li className="hidden sm:inline text-slate-700 relative group">
              <span className="group-hover:text-blue-500 transition-colors">Listings</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </Link>
        </ul>

        <ul className="flex gap-4 md:gap-9 items-center">
          <Link to='/create-listing'>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              Sell/Rent
            </button>
          </Link>
          <div className="relative">
            {currentUser ? (
              <>
                <div onClick={toggleMenu} className="cursor-pointer flex items-center gap-2">
                  <img
                    className="rounded-full h-10 w-10 object-cover border-2 border-blue-500 hover:border-blue-700 transition"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                  <FaBars className="text-slate-700 text-lg hover:text-blue-500 transition-colors" />
                </div>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border animate-slide-down">
                    <ul className="text-gray-700">
                      <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition">
                        <FaUserEdit className="text-blue-500" />
                        <Link to="/profile">Edit Profile</Link>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition">
                        <FaListAlt className="text-blue-500" />
                        <Link to="/listing">My Listings</Link>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition">
                        <FaInfoCircle className="text-blue-500" />
                        <Link to="/about">About</Link>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition">
                        <FaPhone className="text-blue-500" />
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition">
                        <FaSignOutAlt className="text-red-500" />
                        <span onClick={handleSignOut} className="cursor-pointer">
                          Sign Out
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/sign-in">
                <li className="text-gray-700 hover:underline">Sign in</li>
              </Link>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
}