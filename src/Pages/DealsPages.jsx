import React, { useState } from 'react';

const AdminDealManager = () => {
  const [deals, setDeals] = useState([]);
  const [newDeal, setNewDeal] = useState({
    title: '',
    description: '',
    originalPrice: '',
    dealPrice: '',
    stock: '',
    startDate: '',
    endDate: '',
    imageUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeal({ ...newDeal, [name]: value });
  };

  const addDeal = () => {
    setDeals([...deals, newDeal]);
    setNewDeal({
      title: '',
      description: '',
      originalPrice: '',
      dealPrice: '',
      stock: '',
      startDate: '',
      endDate: '',
      imageUrl: '',
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Deal of the Day Management</h2>

      {/* Deal Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Deal</h3>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={newDeal.title}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter deal title"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={newDeal.description}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              value={newDeal.originalPrice}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Original Price"
            />
          </div>

          <div>
            <label className="block text-gray-700">Deal Price</label>
            <input
              type="number"
              name="dealPrice"
              value={newDeal.dealPrice}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Deal Price"
            />
          </div>

          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={newDeal.stock}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Stock Quantity"
            />
          </div>

          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={newDeal.imageUrl}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Image URL"
            />
          </div>

          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={newDeal.startDate}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={newDeal.endDate}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Add Deal Button */}
        <button
          onClick={addDeal}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded mt-4 w-full md:w-auto"
        >
          Add Deal
        </button>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Title</th>
              <th className="p-4 font-semibold text-gray-700">Description</th>
              <th className="p-4 font-semibold text-gray-700">
                Original Price
              </th>
              <th className="p-4 font-semibold text-gray-700">Deal Price</th>
              <th className="p-4 font-semibold text-gray-700">Stock</th>
              <th className="p-4 font-semibold text-gray-700">Dates</th>
              <th className="p-4 font-semibold text-gray-700">Image</th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-4 text-gray-800">{deal.title}</td>
                <td className="p-4 text-gray-600">{deal.description}</td>
                <td className="p-4 text-gray-600">${deal.originalPrice}</td>
                <td className="p-4 text-red-500">${deal.dealPrice}</td>
                <td className="p-4 text-gray-600">{deal.stock}</td>
                <td className="p-4 text-gray-600">
                  {deal.startDate} - {deal.endDate}
                </td>
                <td className="p-4">
                  <img
                    src={deal.imageUrl}
                    alt="Deal"
                    className="w-16 h-16 rounded-md"
                  />
                </td>
                <td className="p-4 space-x-2">
                  <button className="bg-blue-500 text-white p-2 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDealManager;
