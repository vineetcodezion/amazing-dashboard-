import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    content: '', // Added content field
    tags: '',
    imageUrl: '',
    authorName: '',
    authorEmail: '',
  });

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8081/api/v1/blogs/articles'
        );
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const openModal = (blog = null) => {
    if (blog) {
      setForm({
        title: blog.title,
        category: blog.category,
        description: blog.description,
        content: blog.content || '', // Set content if editing
        tags: blog.tags.join(', '),
        imageUrl: blog.imageUrl || '',
        authorName: blog.author?.name || '',
        authorEmail: blog.author?.email || '',
      });
    } else {
      setForm({
        title: '',
        category: '',
        description: '',
        content: '',
        tags: '',
        imageUrl: '',
        authorName: '',
        authorEmail: '',
      });
    }
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingBlog(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSaveBlog = async () => {
    const newBlogData = {
      title: form.title,
      category: form.category,
      description: form.description,
      content: form.content, // Include content field
      tags: form.tags.split(',').map((tag) => tag.trim()),
      imageUrl: form.imageUrl,
      author: {
        name: form.authorName,
        email: form.authorEmail,
      },
    };

    try {
      if (editingBlog) {
        // Update existing blog
        const response = await axios.put(
          `http://localhost:8081/api/v1/blogs/articles/${editingBlog._id}`,
          newBlogData
        );
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === editingBlog._id ? response.data : blog
          )
        );
      } else {
        // Create new blog
        const response = await axios.post(
          'http://localhost:8081/api/v1/blogs/articles',
          newBlogData
        );
        setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  // Function to generate random text for each field
  const generateRandomContent = (field) => {
    const randomTitles = [
      'Exploring React Hooks',
      'The Future of Web Development',
      'JavaScript ES2024 Features',
      'Understanding AI in 2024',
      'Building Scalable Apps with Node.js',
    ];
    const randomTags = ['tech', 'development', 'tutorial', 'web', 'coding'];
    const randomContent = [
      'This is a random content block that can be used as a placeholder text for the content field.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia, nunc et tincidunt vehicula.',
      'React is a powerful JavaScript library for building user interfaces and managing state.',
      'Node.js enables developers to build server-side applications with JavaScript.',
    ];
    const randomDescriptions = [
      'A brief description of the blog post that covers a specific topic.',
      'In-depth exploration of web technologies and best practices.',
      'A beginner-friendly guide to understanding React and its ecosystem.',
      'Insights into the future trends of web development.',
    ];
    const randomCategories = [
      'Technology',
      'Health',
      'Education',
      'Business',
      'Science',
    ];

    switch (field) {
      case 'title':
        return randomTitles[Math.floor(Math.random() * randomTitles.length)];
      case 'tags':
        return randomTags.join(', ');
      case 'content':
        return randomContent[Math.floor(Math.random() * randomContent.length)];
      case 'description':
        return randomDescriptions[
          Math.floor(Math.random() * randomDescriptions.length)
        ];
      case 'category':
        return randomCategories[
          Math.floor(Math.random() * randomCategories.length)
        ];
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Blog Management
        </h1>
        <p className="text-gray-600">Manage all your blog posts from here</p>
      </div>

      {/* Search and Add Blog */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search blogs..."
            className="outline-none w-full text-gray-700"
          />
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 mr-10 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Add New Blog
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            to={`/blog-details/${blog._id}`}
            key={blog._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Category: {blog.category}
              </p>
              <p className="text-sm text-gray-500">
                Created on: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center flex-wrap mt-2 mb-4">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                {blog.description.slice(0, 80)}...
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white h-[700px] overflow-y-auto rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {editingBlog ? 'Edit Blog' : 'Add New Blog'}
            </h2>
            <input
              type="text"
              placeholder="Blog Title"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, title: generateRandomContent('title') })
              }
              className="text-blue-500 mb-4"
            >
              Generate Random Title
            </button>

            <textarea
              placeholder="Content"
              name="content"
              value={form.content}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              rows="6"
            />
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, content: generateRandomContent('content') })
              }
              className="text-blue-500 mb-4"
            >
              Generate Random Content
            </button>

            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            >
              <option value="">Select a Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              {/* Add other valid category options here */}
            </select>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  category: generateRandomContent('category'),
                })
              }
              className="text-blue-500 mb-4"
            >
              Generate Random Category
            </button>

            <input
              type="text"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  description: generateRandomContent('description'),
                })
              }
              className="text-blue-500 mb-4"
            >
              Generate Random Description
            </button>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              name="tags"
              value={form.tags}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <button
              type="button"
              onClick={() =>
                setForm({ ...form, tags: generateRandomContent('tags') })
              }
              className="text-blue-500 mb-4"
            >
              Generate Random Tags
            </button>

            <input
              type="url"
              placeholder="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />

            <input
              type="text"
              placeholder="Author Name"
              name="authorName"
              value={form.authorName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />

            <input
              type="email"
              placeholder="Author Email"
              name="authorEmail"
              value={form.authorEmail}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 mr-2 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlog}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogManagement;
