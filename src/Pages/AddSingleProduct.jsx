import React, { useState } from 'react';

const AddSingleCatalog = () => {
  const [activeTab, setActiveTab] = useState(1); // Track active tab
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    gst: '',
    hsnCode: '',
    size: '',
    attributes: {
      Fabric: '',
      Color: '',
      Fit: '',
      Pattern: '',
      Length: '',
      Occasion: '',
    },
    stockQuantity: '',
    thirdCategory: '',
    countryOfOrigin: '',
    manufacturerDetails: '',
    packerDetails: '',
    importerDetails: '',
    images: [],
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [name]: value },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            Add Single Catalog
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details for your product to create a catalog.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 p-4 border-b bg-gray-100">
          <button
            onClick={() => setActiveTab(1)}
            className={`py-2 px-6 font-medium rounded-lg ${
              activeTab === 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Product 1
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`py-2 px-6 font-medium rounded-lg ${
              activeTab === 2
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Add Product
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {activeTab === 1 && (
            <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* First Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Enter Product Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GST (%)
                </label>
                <input
                  type="number"
                  placeholder="Enter GST"
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  HSN Code
                </label>
                <input
                  type="text"
                  placeholder="Enter HSN Code"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Select</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>

              {/* Attributes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fabric
                </label>
                <input
                  type="text"
                  name="Fabric"
                  value={formData.attributes.Fabric}
                  onChange={handleAttributeChange}
                  placeholder="Enter Fabric"
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  type="text"
                  name="Color"
                  value={formData.attributes.Color}
                  onChange={handleAttributeChange}
                  placeholder="Enter Color"
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fit
                </label>
                <input
                  type="text"
                  name="Fit"
                  value={formData.attributes.Fit}
                  onChange={handleAttributeChange}
                  placeholder="Enter Fit"
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pattern
                </label>
                <input
                  type="text"
                  name="Pattern"
                  value={formData.attributes.Pattern}
                  onChange={handleAttributeChange}
                  placeholder="Enter Pattern"
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Length
                </label>
                <input
                  type="text"
                  name="Length"
                  value={formData.attributes.Length}
                  onChange={handleAttributeChange}
                  placeholder="Enter Length"
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Occasion
                </label>
                <input
                  type="text"
                  name="Occasion"
                  value={formData.attributes.Occasion}
                  onChange={handleAttributeChange}
                  placeholder="Enter Occasion"
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country of Origin
                </label>
                <input
                  type="text"
                  name="countryOfOrigin"
                  value={formData.countryOfOrigin}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Manufacturer Details
                </label>
                <input
                  type="text"
                  name="manufacturerDetails"
                  value={formData.manufacturerDetails}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Packer Details
                </label>
                <input
                  type="text"
                  name="packerDetails"
                  value={formData.packerDetails}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Importer Details
                </label>
                <input
                  type="text"
                  name="importerDetails"
                  value={formData.importerDetails}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-light rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          )}

          {/* Image Upload */}
          <div className="p-6 border- mt-5 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Uploaded Images
            </h2>
            <div className="flex gap-4">
              <label className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer border border-dashed border-gray-300">
                <span className="text-gray-500">+ Add Image</span>
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {formData.images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 p-6 border-t">
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">
              Discard Catalog
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Save and Go Back
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Submit Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSingleCatalog;
