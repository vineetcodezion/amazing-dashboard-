import React, { useState } from "react";

const FilterComponent = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    status: "",
    date: "",
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({
      category: "",
      priceRange: "",
      status: "",
      date: "",
    });
    onFilter({
      category: "",
      priceRange: "",
      status: "",
      date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
    >
      {/* Category Filter */}
      <div className="flex-1">
        <label className="block text-gray-400 text-sm font-semibold mb-2">
          Filter By
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="block w-fit p-2 border rounded-md text-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home-appliances">Home Appliances</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex-1">
        <label className="block text-gray-400 text-sm font-semibold mb-2">
          Sort By
        </label>
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleFilterChange}
          className="block w-fit p-2 border rounded-md text-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-500">$101 - $500</option>
        </select>
      </div>

      {/* Date Filter */}

      {/* Action Buttons */}
      <div className="flex items-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FilterComponent;
