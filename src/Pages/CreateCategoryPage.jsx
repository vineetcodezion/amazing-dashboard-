import React, { Fragment, useState, useEffect } from 'react';
import { MdDeleteSweep } from 'react-icons/md';
import Header from '../Layouts/Header';
import { CgEditMarkup } from 'react-icons/cg';
import { IoMdAddCircle } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const CreateCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      // const token = localStorage.getItem('token'); // Replace with actual token retrieval logic
      try {
        const response = await fetch(
          'http://localhost:8081/api/v1/categories',
          {
            method: 'GET',
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories); // Adjust based on your API's response structure
        } else {
          console.error('Failed to fetch categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddOrUpdateCategory = async () => {
    if (categoryName.trim() !== '' && image) {
      setLoading(true); // Set loading to true before starting request
      const formData = new FormData();
      formData.append('name', categoryName);
      formData.append('image', image);

      const token = localStorage.getItem('token');

      try {
        const response = await fetch(
          'http://localhost:8081/api/v1/categories',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const newCategory = await response.json();
          setCategories((prevCategories) => [
            ...prevCategories,
            {
              id: newCategory.id,
              name: categoryName,
              image: newCategory.image,
            },
          ]);
          setCategoryName('');
          setImage(null);
          setEditingId(null);
        } else {
          console.error('Failed to add category:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding category:', error);
      } finally {
        setLoading(false); // Set loading back to false after request completes
      }
    }
  };

  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.name);
      setEditingId(id);
    }
  };

  const handleDeleteCategory = async (id) => {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this category?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/categories/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Update categories state to reflect deletion
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
        alert('Category deleted successfully.');
      } else {
        console.error('Failed to delete category:', response.statusText);
        alert('Failed to delete category.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error occurred while deleting the category.');
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen w-full bg-gray-100">
        <div
          className="h-[200px] rounded-bl-3xl rounded-br-3xl overflow-hidden bg-cover bg-center z-10 shadow-lg"
          style={{ backgroundImage: "url('/assets/vector.png')" }}
        >
          <Header title="Inventory" />
        </div>

        <div className="p-6 w-[90%] lg:w-[75%] mx-auto rounded-xl bg-white shadow-lg -mt-16 z-50 flex flex-col items-center border">
          <div className="w-full space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-x-3 gap-y-2">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="p-3 border border-gray-300 rounded-lg w-full transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div className="relative w-full">
                <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200 shadow-md flex items-center justify-center">
                  Choose File
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              </div>
              <button
                onClick={handleAddOrUpdateCategory}
                className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-md px-6 py-2 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 text-2xl" />
                ) : (
                  <IoMdAddCircle className="mr-2 text-2xl" />
                )}
                {editingId ? 'Update Category' : 'Add'}
              </button>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="w-full border border-gray-200 shadow-lg rounded-lg">
                <thead className="bg-gray-100 text-gray-600 font-semibold">
                  <tr>
                    <th className="p-4 border-b">Image</th>
                    <th className="p-4 border-b">Category Name</th>
                    <th className="p-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr
                        key={category.id}
                        className="bg-white border-b hover:bg-gray-50 transition-all"
                      >
                        <td className="p-4">
                          <img
                            src={category?.image}
                            alt={category?.name}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                        </td>
                        <td className="p-4 text-gray-700">{category.name}</td>
                        <td className="p-4 flex space-x-4">
                          <button
                            onClick={() => handleEditCategory(category.id)}
                            className="flex items-center text-green-500 hover:text-green-700 transition-all"
                          >
                            <CgEditMarkup className="text-xl" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
                            className="flex items-center text-red-500 hover:text-red-700 transition-all"
                          >
                            <MdDeleteSweep className="text-xl" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <img
                            className="w-20 h-20 mx-auto"
                            src="/assets/empty-folder.png"
                            alt="No categories"
                          />
                          <span className="mt-2 text-lg font-semibold">
                            No Categories Found
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateCategoryPage;
