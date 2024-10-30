import React, { Fragment, useState } from "react";
import { MdDelete, MdDeleteSweep, MdEdit } from "react-icons/md";
import Header from "../Layouts/Header";
import { CgEditMarkup } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";

const CreateCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null); // State to store the selected image
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdateCategory = async () => {
    if (categoryName.trim() !== "" && image) {
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("image", image);

      const token = localStorage.getItem("token"); // Replace with actual token retrieval logic

      try {
        const response = await fetch(
          "http://localhost:8081/api/v1/admin/categories/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              // You may need to set 'Content-Type' to 'multipart/form-data' for form data.
            },
            body: formData,
          }
        );

        if (response.ok) {
          const newCategory = await response.json(); // Assuming the API returns the created category
          setCategories((prevCategories) => [
            ...prevCategories,
            {
              id: newCategory.id,
              name: categoryName,
              image: newCategory.image,
            }, // Adjust based on your API response
          ]);
          setCategoryName("");
          setImage(null); // Clear the image input
          setEditingId(null); // Reset editing ID
        } else {
          console.error("Failed to add category:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.name);
      setEditingId(id); // Set the editing ID
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <Fragment>
      <div className="h-screen w-full">
        <div
          className="h-[200px] rounded-bl-3xl rounded-br-3xl overflow-hidden bg-cover border-2 bg-center z-10"
          style={{ backgroundImage: "url('/assets/vector.png')" }}
        >
          <Header title="Inventory" />
        </div>

        <div className="p-4 w-[80%] mx-auto rounded-xl bg-gray-100 border-2 -mt-20 z-50 flex flex-col items-center">
          <div className="w-full">
            <div className="mb-4 flex flex-row items-center gap-x-3">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="p-2 border border-gray-300 rounded-lg w-full transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-opacity-75"
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="p-2 border border-gray-300 rounded-lg w-full transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-opacity-75"
              />
              <button
                onClick={handleAddOrUpdateCategory}
                className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 shadow-md flex items-center justify-center px-4 py-2"
              >
                <span className="mr-1">
                  {editingId ? "Update Category" : "Add"}
                </span>
                <IoMdAddCircle />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-4 border-b text-left">Category Name</th>
                    <th className="p-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category._id} className="hover:bg-gray-100">
                        <td className="p-4">{category.name}</td>
                        <td className="p-4 flex space-x-2">
                          <button
                            onClick={() => handleEditCategory(category.id)}
                            className="flex items-center text-green-500 hover:text-green-700"
                          >
                            <CgEditMarkup className="inline mr-1 font-bold" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="flex items-center text-red-500 hover:text-red-700"
                          >
                            <MdDeleteSweep className="inline mr-1 font-bold text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="w-full flex items-center justify-center">
                      <img
                        className="w-20 h-20 mx-auto"
                        src="/assets/empty-folder.png"
                        alt=""
                      />
                      <span className="text-gray-600 font-semibold text-lg">
                        No Categories Found
                      </span>
                    </div>
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
