import { Fragment, useEffect, useState } from 'react';
import Header from '../Layouts/Header';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdOutlineAutoDelete } from 'react-icons/md';
import { BiMessageSquareEdit } from 'react-icons/bi';

const CreateSubcategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const token = localStorage.getItem('token');

  // Fetch categories and subcategories from the API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/categories');
        const data = await response.json();

        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:8081/api/v1/subcategories'
        );
        const data = await response.json();

        setSubcategories(data.subcategories);

        console.log('ssss', subcategories);
      } catch (error) {
        console.error('Failed to fetch subcategories', error);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !subcategoryName || !image) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', selectedCategory);
    formData.append('name', subcategoryName);
    formData.append('image', image);

    try {
      const response = await fetch(
        'http://localhost:8081/api/v1/subcategories',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubcategories([...subcategories, data.subcategories]);
        setSubcategoryName('');
        setSelectedCategory('');
        setImage(null);
      } else {
        alert(`Error: ${data.message || 'Unable to create subcategory'}`);
      }
    } catch (error) {
      console.error('Failed to create subcategory', error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(subcategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubcategories = subcategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Fragment>
      <div className="min-h-[200vh] w-full bg-gradient-to-br flex flex-col items-center">
        <div
          className="h-[250px] w-full rounded-bl-[50px] rounded-br-[50px] overflow-hidden bg-cover bg-center shadow-lg mb-10"
          style={{ backgroundImage: "url('/assets/vector.png')" }}
        >
          <Header title="Inventory" />
        </div>

        <div className="p-10 w-[90%] -mt-[150px] lg:w-[60%] mx-auto bg-white rounded-3xl shadow-2xl flex flex-col items-center border border-gray-200 transform transition duration-500 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-500 tracking-wide">
            Create a New Subcategory
          </h2>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <select
              className="p-4 border border-gray-300 rounded-lg w-full text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories?.map((category, i) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter subcategory name"
              className="p-4 border border-gray-300 rounded-lg w-full text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
            />

            <div className="relative w-full flex gap-x-10">
              <label className="bg-gradient-to-r p-2 max-w-fit bg-indigo-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md flex items-center justify-center space-x-2">
                <span>Choose Image</span>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r bg-indigo-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg px-4 py-3 max-w-fit font-semibold text-lg"
            >
              Create Subcategory
            </button>
          </form>
        </div>

        <div className="p-10 w-[90%] lg:w-[80%] mx-auto mt-10 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">
            Subcategories
          </h3>
          <table className="min-w-full text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Subcategory Name</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSubcategories?.map((subcategory) => (
                <>
                  <tr key={subcategory._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{subcategory._id}</td>
                    <td className="py-2 px-4 border-b">
                      {
                        categories.find(
                          (cat) => cat._id === subcategory.category._id
                        )?.name
                      }
                    </td>
                    <td className="py-2 px-4 border-b">{subcategory.name}</td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="h-10 w-10 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b  gap-2 items-center">
                      <span className="flex flex-row gap-3">
                        <MdOutlineAutoDelete className="font-bold text-red-500" />
                        <BiMessageSquareEdit className="font-bold text-green-500" />
                      </span>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-indigo-500 text-white rounded-lg ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-indigo-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-indigo-500 text-white rounded-lg ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-indigo-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateSubcategoryPage;
