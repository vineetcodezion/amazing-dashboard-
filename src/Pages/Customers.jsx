import React, { useState } from 'react';
import { FaMailBulk } from 'react-icons/fa';
import { FaVoicemail } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample user data
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'User' },
    {
      id: 4,
      name: 'David Brown',
      email: 'david@example.com',
      role: 'User',
    },
    // Add more users as needed
  ];

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">User List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
      />

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-blue-200 text-blue-900">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-blue-50 transition-all`}
              >
                <td className="py-3 px-6 text-gray-700">{user.name}</td>
                <td className="py-3 px-6 text-gray-600"> {user.email}</td>
                <td className="py-3 px-6 text-gray-600">{user.role}</td>
                <td className="py-3 px-6 text-center">
                  <Link
                    to="/customer-details"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
