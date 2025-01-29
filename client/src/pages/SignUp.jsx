import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the Terms and Conditions to proceed.');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-8 max-w-lg mx-auto mt-[120px] border rounded-xl shadow-xl my-10 bg-white text-gray-800'>
      <h1 className='text-4xl text-center font-bold mb-6 text-gray-900'>Sign Up</h1>
      <p className='text-center text-lg mb-6 text-gray-600'>Create your account to get started.</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div className="flex items-center bg-gray-100 text-gray-700 border border-gray-300 p-4 rounded-lg shadow-sm focus-within:border-teal-500">
          <FaUser className="text-teal-500 mr-3" />
          <input
            type="text"
            placeholder="Username"
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            id="username"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center bg-gray-100 text-gray-700 border border-gray-300 p-4 rounded-lg shadow-sm focus-within:border-teal-500">
          <FaEnvelope className="text-teal-500 mr-3" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center bg-gray-100 text-gray-700 border border-gray-300 p-4 rounded-lg shadow-sm focus-within:border-teal-500">
          <FaLock className="text-teal-500 mr-3" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            id="password"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            className="mr-2"
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms" className="text-gray-600 text-sm">
            I accept the <span className="text-teal-600">Terms and Conditions</span>
          </label>
        </div>

        <button
          disabled={loading}
          className='bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg uppercase font-semibold transition-all duration-300 ease-in-out disabled:opacity-60 shadow-md'
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
        <OAuth />
        Welcome email on its way! Check spam if you don't see it
      </form>
      <div className='flex flex-col items-center gap-2 mt-6'>
        <p className='text-gray-600'>Already have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-teal-600 hover:text-teal-700 hover:underline font-medium'>Sign in here</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center font-semibold'>{error}</p>}
    </div>
  );
}
