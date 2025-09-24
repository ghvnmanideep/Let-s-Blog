import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`)
      .then(res => {
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title || !content) {
      alert('Title and Content cannot be empty.');
      return;
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/blogs/${id}`);
    } catch (err) {
      alert('Failed to update blog.');
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="w-screen min-h-screen bg-black flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-2xl p-10 border border-gray-700">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-8 text-center">
          Edit Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block mb-2 text-gray-300 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block mb-2 text-gray-300 font-medium">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Enter blog content"
              rows={8}
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-3 bg-white text-yellow-500 font-semibold rounded-full border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            >
              Update Blog
            </button>
            <Link
              to={`/blogs/${id}`}
              className="text-red-400 hover:text-red-600 underline font-semibold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
