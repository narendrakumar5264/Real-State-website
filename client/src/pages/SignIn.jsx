import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { FaUser, FaLock } from 'react-icons/fa';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-8 max-w-lg mx-auto border rounded-xl shadow-2xl my-10 bg-gradient-to-br from-teal-500 to-cyan-500 text-white'>
      <h1 className='text-5xl text-center font-extrabold mb-8'>Sign In</h1>
      <p className='text-center text-lg mb-6'>Welcome back! Please sign in to continue.</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div className="flex items-center bg-white text-gray-700 border-2 border-gray-200 p-4 rounded-xl shadow-lg">
          <FaUser className="text-teal-500 mr-4" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center bg-white text-gray-700 border-2 border-gray-200 p-4 rounded-xl shadow-lg">
          <FaLock className="text-teal-500 mr-4" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
            id="password"
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className='bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl uppercase font-bold transition-all duration-300 ease-in-out disabled:opacity-70 shadow-md'
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex flex-col items-center gap-2 mt-6'>
        <p className='text-gray-200'>Don't have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-yellow-300 hover:underline font-medium'>Create an account</span>
        </Link>
      </div>
      {error && <p className='text-red-300 mt-5 text-center font-semibold'>{error}</p>}
    </div>
  );
}
