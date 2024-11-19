// import React, { useState, useEffect } from 'react';
// import { MdDonutSmall } from 'react-icons/md';
// import axios from 'axios';

// const GridMenu = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [file, setFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState('');
//   const [error, setError] = useState('');
//   const [progress, setProgress] = useState(0); // Progress bar state

//   // Fetch categories from the API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('/api/v1/admin/categories');
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch subcategories when a category is selected
//   useEffect(() => {
//     if (selectedCategory) {
//       const fetchSubCategories = async () => {
//         try {
//           const response = await axios.get(
//             `/api/v1/admin/sub-categories/${selectedCategory._id}`
//           );
//           setSubCategories(response.data.data);
//         } catch (error) {
//           console.error('Error fetching subcategories:', error);
//         }
//       };
//       fetchSubCategories();
//     }
//   }, [selectedCategory]);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setProgress(0); // Reset progress bar on new file selection
//   };

//   // Handle file upload
//   const handleFileSubmit = async (e) => {
//     e.preventDefault();

//     if (!file || !selectedSubCategory) {
//       setUploadMessage('Please select a subcategory and choose a file.');
//       return;
//     }

//     const token = localStorage.getItem('token');

//     if (!token) {
//       setUploadMessage('Authorization token is missing.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setUploadMessage(''); // Reset message
//       setError(''); // Reset error message

//       const response = await axios.post(
//         '/api/v1/admin/products/upload-products',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setProgress(percentCompleted); // Update progress state
//           },
//         }
//       );

//       setUploadMessage('File uploaded successfully!');
//       console.log('Upload Response:', response.data);
//       setFile(null); // Clear the file input after upload
//       setProgress(0); // Reset progress after upload
//     } catch (error) {
//       setError('Error uploading file.');
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className="flex w-full min-h-screen p-4 gap-4">
//       {/* Categories */}
//       <div className="flex flex-col w-1/4 py-4 border-2">
//         <h2 className="text-lg flex items-center gap-2 pb-2 font-semibold mb-2 justify-center border-b-2">
//           <MdDonutSmall />
//           <span className="text-lg font-bold text-gray-500">
//             Your Categories
//           </span>
//         </h2>
//         {categories.length ? (
//           categories.map((category) => (
//             <button
//               key={category._id}
//               onClick={() => {
//                 setSelectedCategory(category);
//                 setSelectedSubCategory(null);
//                 setSubCategories([]);
//               }}
//               className={`px-8 py-4 text-left border-b ${
//                 selectedCategory === category ? 'bg-blue-600 text-white' : ''
//               }`}
//             >
//               {category.name}
//             </button>
//           ))
//         ) : (
//           <p className="text-center py-4">No categories found</p>
//         )}
//       </div>

//       {/* Subcategories */}
//       {selectedCategory && (
//         <div className="flex flex-col w-1/4 border-2">
//           <h2 className="text-lg font-bold text-center py-2 border-b">
//             Subcategories
//           </h2>
//           {subCategories.length ? (
//             subCategories.map((subCategory) => (
//               <button
//                 key={subCategory._id}
//                 onClick={() => setSelectedSubCategory(subCategory)}
//                 className={`px-8 py-4 text-left border-b ${
//                   selectedSubCategory === subCategory
//                     ? 'bg-blue-600 text-white'
//                     : ''
//                 }`}
//               >
//                 {subCategory.name}
//               </button>
//             ))
//           ) : (
//             <p className="text-center py-4">No subcategories available</p>
//           )}
//         </div>
//       )}

//       {/* Product Upload Form */}
//       {selectedSubCategory && (
//         <div className="flex flex-col w-1/4 py-4 border-2">
//           <h2 className="text-lg font-bold text-center py-2 border-b">
//             Upload Products to {selectedSubCategory.name}
//           </h2>
//           <form onSubmit={handleFileSubmit} className="px-4 py-2 mt-10">
//             <div className="mb-4">
//               <div className="relative">
//                 <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition">
//                   Choose File
//                   <input
//                     type="file"
//                     accept=".xlsx,.xls"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     required
//                   />
//                 </label>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             {progress > 0 && (
//               <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
//                 <div
//                   className="bg-blue-500 h-4 rounded-full"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             )}

//             {file && (
//               <div className="flex items-center justify-center mb-4">
//                 <p className="text-gray-700">{file.name}</p>
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//             >
//               Upload Products
//             </button>

//             {uploadMessage && (
//               <p className="mt-4 py-1 text-sm text-center bg-green-600 rounded-lg text-white">
//                 {uploadMessage}
//               </p>
//             )}
//             {error && (
//               <p className="mt-4 py-1 text-sm text-center bg-red-600 rounded-lg text-white">
//                 {error}
//               </p>
//             )}
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GridMenu;
import React, { useState, useEffect } from 'react';
import { MdDonutSmall, MdFileUpload } from 'react-icons/md';
import axios from 'axios';

const GridMenu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    subcategory: '',
    description: '',
    price: '',
    manufacturer: '',
    material: '',
    fabricCare: '',
    stock: '',
    sizes: [],
    colors: [],
    images: [],
    variations: [],
    fit: '',
    sizeChartImage: '',
    pattern: '',
    netWeight: '',
    productDimensions: {
      length: '',
      width: '',
      height: '',
    },
    tags: [],
    excelFile: null, // State for storing the Excel file
  });
  const [uploadMessage, setUploadMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/v1/admin/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
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
          console.error('Error fetching subcategories:', error);
        }
      };
      fetchSubCategories();
    }
  }, [selectedCategory]);

  // Handle input changes for product fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  // // Handle dimensions change
  // const handleDimensionsChange = (e) => {
  //   const { name, value } = e.target;
  //   setProductDetails({
  //     ...productDetails,
  //     productDimensions: {
  //       ...productDetails.productDimensions,
  //       [name]: value,
  //     },
  //   });
  // };

  // // Handle image upload for product images
  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const newImages = files.map((file) => ({
  //     url: URL.createObjectURL(file), // placeholder URL for preview
  //     altText: file.name,
  //   }));
  //   setProductDetails({
  //     ...productDetails,
  //     images: newImages,
  //   });
  // };

  // // Handle Excel file upload
  // const handleExcelFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setProductDetails({
  //     ...productDetails,
  //     excelFile: file,
  //   });
  // };

  // Handle form submission to add a single product
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authorization token is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('name', productDetails.name);
    formData.append('category', productDetails.category);
    formData.append('subcategory', productDetails.subcategory);
    formData.append('description', productDetails.description);
    formData.append('price', productDetails.price);
    formData.append('manufacturer', productDetails.manufacturer);
    formData.append('material', productDetails.material);
    formData.append('fabricCare', productDetails.fabricCare);
    formData.append('stock', productDetails.stock);
    formData.append('sizes', productDetails.sizes);
    formData.append('colors', productDetails.colors);
    formData.append('fit', productDetails.fit);
    formData.append('sizeChartImage', productDetails.sizeChartImage);
    formData.append('pattern', productDetails.pattern);
    formData.append('netWeight', productDetails.netWeight);
    formData.append(
      'productDimensions',
      JSON.stringify(productDetails.productDimensions)
    );
    formData.append('tags', productDetails.tags);

    // Handle image variations separately
    productDetails.images.forEach((image, index) => {
      formData.append(`images[${index}][url]`, image.url);
      formData.append(`images[${index}][altText]`, image.altText);
    });

    // If Excel file is uploaded, add it to the form data
    if (productDetails.excelFile) {
      formData.append('excelFile', productDetails.excelFile);
    }

    try {
      setError(''); // Reset error message

      const response = await axios.post(
        `/api/v1/admin/products/upload-single-product/${selectedSubCategory._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadMessage('Product uploaded successfully!');
      console.log('Product Upload Response:', response.data);

      setProductDetails({
        name: '',
        category: '',
        subcategory: '',
        description: '',
        price: '',
        manufacturer: '',
        material: '',
        fabricCare: '',
        stock: '',
        sizes: [],
        colors: [],
        images: [],
        variations: [],
        fit: '',
        sizeChartImage: '',
        pattern: '',
        netWeight: '',
        productDimensions: {
          length: '',
          width: '',
          height: '',
        },
        tags: [],
        excelFile: null, // Reset the Excel file input after submit
      });
    } catch (error) {
      setError('Error uploading product.');
      console.error('Error uploading product:', error);
    }
  };

  const handleExcelFileChange = (e) => {
    const file = e.target.files[0];
    setProductDetails({
      ...productDetails,
      excelFile: file,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Assuming only one file is dropped
    if (file) {
      setProductDetails({
        ...productDetails,
        excelFile: file, // Update state with the dropped file
      });
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
                selectedCategory === category ? 'bg-blue-600 text-white' : ''
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
                    ? 'bg-blue-600 text-white'
                    : ''
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
        <div className="flex flex-col w-1/4 py-4 border-2 px-2">
          <h2 className="text-lg font-bold text-center py-2 border-b">
            Add New Product
          </h2>
          {/* File Selection Section */}
          <div className="mb-6 border-b-2 pb-6">
            {/* Drag-and-Drop Zone */}
            <div
              className="flex justify-center items-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition"
              onDrop={handleDrop} // Handle drop event
              onDragOver={handleDragOver} // Handle drag over event
            >
              <div className="text-center">
                <MdFileUpload size={36} className="text-gray-500 mb-3" />
                <p className="text-xl text-gray-700">
                  Drag and drop your Excel file here
                </p>
                <p className="text-sm text-gray-500">or click to select</p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleExcelFileChange} // Handle file change event
                  className="hidden"
                />
              </div>
            </div>

            {/* Display the selected file name below */}
            {productDetails.excelFile && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  <strong>Selected file:</strong>{' '}
                  {productDetails.excelFile.name}
                </p>
              </div>
            )}
          </div>

          {/* Product Form */}
          <form onSubmit={handleProductSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productDetails.name}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <select
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              name="subcategory"
              value={productDetails.subcategory}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
            <textarea
              name="description"
              placeholder="Product Description"
              value={productDetails.description}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productDetails.price}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Add Product
            </button>
          </form>
          {uploadMessage && (
            <p className="mt-4 py-2 text-sm text-center bg-indigo-600 rounded-lg text-white">
              {uploadMessage}
            </p>
          )}
          {error && (
            <p className="mt-4 py-2 text-sm text-center bg-red-600 rounded-lg text-white">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GridMenu;
