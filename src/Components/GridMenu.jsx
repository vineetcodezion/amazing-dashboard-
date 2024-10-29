import React, { useState, useEffect } from "react";
import { MdDonutSmall } from "react-icons/md";
import axios from "axios";

const GridMenu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0); // Progress bar state

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/admin/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get(
            `/api/v1/admin/sub-categories/${selectedCategory._id}`
          );
          setSubCategories(response.data.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubCategories();
    }
  }, [selectedCategory]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0); // Reset progress bar on new file selection
  };

  // Handle file upload
  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (!file || !selectedSubCategory) {
      setUploadMessage("Please select a subcategory and choose a file.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setUploadMessage("Authorization token is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadMessage(""); // Reset message
      setError(""); // Reset error message

      const response = await axios.post(
        "/api/v1/admin/products/upload-products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted); // Update progress state
          },
        }
      );

      setUploadMessage("File uploaded successfully!");
      console.log("Upload Response:", response.data);
      setFile(null); // Clear the file input after upload
      setProgress(0); // Reset progress after upload
    } catch (error) {
      setError("Error uploading file.");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen p-4 gap-4">
      {/* Categories */}
      <div className="flex flex-col w-1/4 py-4 border-2">
        <h2 className="text-lg flex items-center gap-2 pb-2 font-semibold mb-2 justify-center border-b-2">
          <MdDonutSmall />
          <span className="text-lg font-bold text-gray-500">
            Your Categories
          </span>
        </h2>
        {categories.length ? (
          categories.map((category) => (
            <button
              key={category._id}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubCategory(null);
                setSubCategories([]);
              }}
              className={`px-8 py-4 text-left border-b ${
                selectedCategory === category ? "bg-blue-600 text-white" : ""
              }`}
            >
              {category.name}
            </button>
          ))
        ) : (
          <p className="text-center py-4">No categories found</p>
        )}
      </div>

      {/* Subcategories */}
      {selectedCategory && (
        <div className="flex flex-col w-1/4 border-2">
          <h2 className="text-lg font-bold text-center py-2 border-b">
            Subcategories
          </h2>
          {subCategories.length ? (
            subCategories.map((subCategory) => (
              <button
                key={subCategory._id}
                onClick={() => setSelectedSubCategory(subCategory)}
                className={`px-8 py-4 text-left border-b ${
                  selectedSubCategory === subCategory
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                {subCategory.name}
              </button>
            ))
          ) : (
            <p className="text-center py-4">No subcategories available</p>
          )}
        </div>
      )}

      {/* Product Upload Form */}
      {selectedSubCategory && (
        <div className="flex flex-col w-1/4 py-4 border-2">
          <h2 className="text-lg font-bold text-center py-2 border-b">
            Upload Products to {selectedSubCategory.name}
          </h2>
          <form onSubmit={handleFileSubmit} className="px-4 py-2 mt-10">
            <div className="mb-4">
              <div className="relative">
                <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition">
                  Choose File
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {file && (
              <div className="flex items-center justify-center mb-4">
                <p className="text-gray-700">{file.name}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Upload Products
            </button>

            {uploadMessage && (
              <p className="mt-4 py-1 text-sm text-center bg-green-600 rounded-lg text-white">
                {uploadMessage}
              </p>
            )}
            {error && (
              <p className="mt-4 py-1 text-sm text-center bg-red-600 rounded-lg text-white">
                {error}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default GridMenu;
