import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GLogin from './GLogin';

const CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '551070839040-qh22gqelveth5aaiqfan1fm43v0tvs7s.apps.googleusercontent.com';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { username, password }
      );
      const { token, _id, username: userName, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem(
        'user',
        JSON.stringify({ _id, username: userName, role, token })
      );
      navigate('/');
    } catch (err) {
      alert(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="w-screen min-h-screen bg-black text-gray-200 flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-2xl p-10 border border-gray-700">
        <h1 className="text-5xl font-extrabold mb-6 text-yellow-400 text-center">
          Let's Blog
        </h1>
        <h2 className="text-3xl font-semibold mb-8 text-white text-center">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 font-medium text-gray-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-yellow-500 font-semibold rounded-full shadow-lg border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          New here?{' '}
          <Link to="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold">
            Register now
          </Link>
        </p>

        <div className="mt-8 flex justify-center">
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GLogin />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}
