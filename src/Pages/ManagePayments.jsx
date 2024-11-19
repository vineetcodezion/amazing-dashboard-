import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaCogs } from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2'; // Using Chart.js
import 'chart.js/auto';

const PaymentDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  // Data for charts
  const overviewData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [
          1200, 1900, 1700, 1500, 2200, 2100, 2300, 2600, 2400, 2500, 2800,
          3000,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
      },
    ],
  };

  const transactionsData = {
    labels: ['Completed', 'Pending', 'Failed'],
    datasets: [
      {
        label: 'Transactions',
        data: [450, 70, 10],
        backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
      },
    ],
  };

  const profitMarginData = {
    labels: ['Profit', 'Expenses'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['#34D399', '#F87171'],
      },
    ],
  };

  return (
    <div className="min-h-[300vh] bg-gray-100 p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Payment Management Dashboard
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
          <FaCogs className="inline-block mr-2" /> Settings
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        {['Overview', 'Transactions', 'Reports', 'Settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 text-sm">Total Revenue</h2>
                <p className="text-2xl font-bold text-gray-800">$120,500</p>
              </div>
              <FaArrowUp className="text-green-500" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 text-sm">Transactions</h2>
                <p className="text-2xl font-bold text-gray-800">1,230</p>
              </div>
              <FaArrowDown className="text-red-500" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 text-sm">Profit Margin</h2>
                <p className="text-2xl font-bold text-gray-800">42%</p>
              </div>
              <FaArrowUp className="text-green-500" />
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Monthly Revenue
            </h3>
            <Line data={overviewData} />
          </div>

          {/* Transaction Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Transaction Breakdown
            </h3>
            <Doughnut data={transactionsData} />
          </div>

          {/* Profit Margin Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Profit Margin
            </h3>
            <Doughnut data={profitMarginData} />
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'Transactions' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Transaction History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Transaction Rows */}
                <tr>
                  <td className="py-3 px-4">T-12345</td>
                  <td className="py-3 px-4">2024-10-01</td>
                  <td className="py-3 px-4">$500</td>
                  <td className="py-3 px-4 text-green-500">Completed</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">T-12346</td>
                  <td className="py-3 px-4">2024-10-02</td>
                  <td className="py-3 px-4">$750</td>
                  <td className="py-3 px-4 text-yellow-500">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'Reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue and Expense Comparison */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Revenue vs Expenses
            </h3>
            <Bar
              data={{
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                  {
                    label: 'Revenue',
                    data: [4000, 3000, 5000, 7000],
                    backgroundColor: '#34D399',
                  },
                  {
                    label: 'Expenses',
                    data: [2000, 1500, 3000, 3500],
                    backgroundColor: '#F87171',
                  },
                ],
              }}
            />
          </div>

          {/* Yearly Growth Rate */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Yearly Growth Rate
            </h3>
            <Line
              data={{
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [
                  {
                    label: 'Growth Rate (%)',
                    data: [10, 20, 15, 30, 40],
                    borderColor: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.3)',
                  },
                ],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;
