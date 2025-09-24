import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch {
      setError('Failed to create blog');
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-2xl p-10">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-4 text-red-500 text-center">
          Let's Blog
        </h1>
        <h2 className="text-3xl font-semibold mb-3 text-gray-200 text-center">
          Create a New Blog
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Share your thoughts, stories, or ideas with the world. Fill out the details below and publish your blog.
        </p>

        {/* Error Message */}
        {error && (
          <p className="mb-6 text-center text-red-500 font-semibold bg-red-900/30 p-3 rounded-lg">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-medium text-gray-300"
            >
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a catchy blog title"
              value={title}
              required
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Content Field */}
          <div>
            <label
              htmlFor="content"
              className="block mb-2 font-medium text-gray-300"
            >
              Blog Content
            </label>
            <textarea
              id="content"
              rows="10"
              placeholder="Write your blog content here..."
              value={content}
              required
              onChange={e => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-red-600 text-black font-semibold rounded-full shadow-lg hover:bg-red-700 transition"
            >
              Publish Blog
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-3 bg-red-600 text-black font-semibold rounded-full shadow-lg hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
