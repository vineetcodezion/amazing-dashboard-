import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrashAlt, FaChartArea, FaHeart } from 'react-icons/fa';

const BlogDetailAdmin = () => {
  const { id } = useParams(); // Assume the blogId is passed via the route params
  const navigate = useNavigate(); // Using useNavigate for programmatic navigation

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/v1/blogs/articles/${id}`
        );
        const data = await response.json();
        setBlog(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this blog? This action cannot be undone.'
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8081/api/v1/blogs/articles/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          alert('Blog deleted successfully');
          navigate('/manage-blogs'); // Navigate to the manage blogs page
        } else {
          alert('Failed to delete the blog. Please try again later.');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete the blog. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back and Actions */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/manage-blogs"
          className="text-blue-600 flex items-center hover:text-blue-800 transition-all"
        >
          <FaArrowLeft className="mr-1" /> Back to Blogs
        </Link>
        <div className="flex space-x-4 mr-10">
          <button
            className="flex items-center text-red-600 bg-red-300 p-2 rounded-md hover:text-red-800 transition-all"
            onClick={deleteBlog}
          >
            <FaTrashAlt className="mr-2" /> Delete Blog
          </button>
        </div>
      </div>

      {/* Blog Main Info */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          {blog.title}
        </h1>
        <div className="flex items-center text-gray-600 mb-4">
          <p className="mr-4">
            Author:{' '}
            <span className="font-medium text-gray-700">
              {blog?.author.name}
            </span>
          </p>
          <p className="mr-4">
            Published: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="mr-4">
            Category:{' '}
            <span className="font-medium text-blue-600">{blog.category}</span>
          </p>
        </div>
        <div className="flex items-center flex-wrap mb-6">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <img
          src={
            blog.imageUrl ||
            'https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-244.jpg?ga=GA1.1.106224706.1726054175&semt=ais_hybrid'
          }
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        {/* Blog Description */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Description
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          {blog.description || blog.content}
        </p>

        {/* Blog Stats */}
        <div className="flex items-center space-x-8 border-t pt-4">
          <div className="text-gray-600 flex flex-row items-center gap-3">
            <span className="font-medium text-gray-800">{blog.views || 0}</span>
            <FaChartArea className="text-indigo-400" />
          </div>
          <div className="text-gray-600 flex flex-row items-center gap-3">
            <span className="font-medium text-gray-800">{blog.likes || 0}</span>
            <FaHeart className="text-red-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailAdmin;
