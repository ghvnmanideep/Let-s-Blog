import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch {
      alert('Failed to delete blog.');
    }
  };

  if (loading) return (
    <div className="w-screen min-h-screen bg-black flex items-center justify-center text-white">
      <p>Loading...</p>
    </div>
  );

  if (!blog) return (
    <div className="w-screen min-h-screen bg-black flex items-center justify-center text-white">
      <p>Blog not found</p>
    </div>
  );

  let isAuthor = false;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isAuthor = blog.author && blog.author._id === payload.id;
    }
  } catch (e) {
    isAuthor = false;
  }

  return (
    <div className="w-screen min-h-screen bg-black flex justify-center px-6 py-10 text-gray-200">
      <div className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-2xl p-10 border border-gray-700">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-yellow-400">{blog.title}</h1>
          {isAuthor && (
            <div className="space-x-4">
              <Link to={`/edit/${blog._id}`} className="text-yellow-400 hover:text-yellow-300 underline font-semibold">Edit</Link>
              <button onClick={handleDelete} className="text-red-500 hover:text-red-600 underline font-semibold">Delete</button>
            </div>
          )}
        </header>
        <p className="text-gray-400 mb-6 italic">
          By {blog.author?.username || blog.author?.email} on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <article className="prose prose-yellow max-w-full text-gray-200" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <Link to="/" className="text-yellow-400 hover:text-yellow-300 underline inline-block mt-10">&larr; Back to all posts</Link>
      </div>
    </div>
  );
}
