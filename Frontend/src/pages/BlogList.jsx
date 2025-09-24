import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6; // 6 blogs per page
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const fetchBlogs = (page = 1) => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/blogs?page=${page}`)
      .then(res => {
        setBlogs(res.data.blogs);
        setTotalBlogs(res.data.totalBlogs);
        setError('');
      })
      .catch(err => {
        setError('Failed to load blogs');
        console.error(err);
      });
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCreateBlog = () => {
    if (isAuthenticated) navigate('/create');
    else navigate('/login');
  };

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  const goToPage = pageNumber => setCurrentPage(pageNumber);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 bg-gray-900 shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Let's Blog</h1>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-white text-yellow-500 px-6 py-3 rounded-lg font-semibold border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
          >
            Logout
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 flex justify-center">
        <div className="w-full max-w-7xl">
          <button
            onClick={handleCreateBlog}
            className="block mb-12 bg-white text-yellow-500 px-8 py-4 rounded-full text-xl font-semibold border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition text-center w-full"
          >
            + Create New Blog
          </button>

          {error && <p className="mb-6 text-red-400 font-semibold">{error}</p>}
          {!error && blogs.length === 0 && (
            <p className="mb-6 text-yellow-400 font-medium text-center">No blogs found.</p>
          )}

          {/* Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <div
                key={blog._id}
                className="p-8 bg-gray-900 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-2xl font-semibold text-yellow-400 hover:text-yellow-300 hover:underline transition"
                >
                  {blog.title}
                </Link>
                <p className="mt-4 italic text-gray-400">
                  by <span className="font-bold text-white">{blog.author?.username || blog.author?.email}</span>
                  <span className="mx-2 text-gray-500">&bull;</span>
                  <span className="text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                </p>
                <p
                  className="mt-6 text-white overflow-hidden"
                  style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}
                >
                  {blog.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Pagination */}
      {totalPages > 1 && (
        <footer className="flex justify-center items-center py-6 bg-gray-900 space-x-2 flex-wrap">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded font-semibold border-2 border-yellow-400 transition ${
              currentPage === 1
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
            }`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded font-semibold border-2 border-yellow-400 transition ${
                currentPage === page
                  ? 'bg-yellow-400 text-black'
                  : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded font-semibold border-2 border-yellow-400 transition ${
              currentPage === totalPages
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-yellow-400 hover:text-black'
            }`}
          >
            Next
          </button>
        </footer>
      )}
    </div>
  );
}
