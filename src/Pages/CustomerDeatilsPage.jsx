import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaSave } from 'react-icons/fa';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 8901',
    address: '123 Elm Street, Springfield, USA',
    city: 'Springfield',
    postalCode: '12345',
    joinDate: '2024-01-15',
    loyaltyPoints: 1200,
    membershipStatus: 'Gold',
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-100 p-8 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Customer Details
          </h1>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-700 transition-all">
            <FaEdit />
            <span>Edit Customer</span>
          </button>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-700 font-medium">Full Name</label>
                <p className="text-gray-800">{customer.name}</p>
              </div>

              <div>
                <label className="text-gray-700 font-medium">Email</label>
                <p className="text-gray-800">{customer.email}</p>
              </div>

              <div>
                <label className="text-gray-700 font-medium">
                  Phone Number
                </label>
                <p className="text-gray-800">{customer.phone}</p>
              </div>

              <div>
                <label className="text-gray-700 font-medium">Address</label>
                <p className="text-gray-800">{customer.address}</p>
                <p className="text-gray-800">
                  {customer.city}, {customer.postalCode}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-700 font-medium">Join Date</label>
                <p className="text-gray-800">
                  {new Date(customer.joinDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="text-gray-700 font-medium">
                  Loyalty Points
                </label>
                <p className="text-gray-800">{customer.loyaltyPoints}</p>
              </div>

              <div>
                <label className="text-gray-700 font-medium">
                  Membership Status
                </label>
                <p className="text-gray-800">{customer.membershipStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-6">
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all flex items-center space-x-2">
            <FaTrashAlt />
            <span>Delete Customer</span>
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center space-x-2">
            <FaSave />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
