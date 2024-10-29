import React, { useState } from "react";
import { HiSearch } from "react-icons/hi"; // Importing the search icon from react-icons

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setSearchTerm(value);
    onSearch(value); // Call the onSearch function passed from the parent
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange} // Handle input change
          placeholder={placeholder}
          className="w-[300px] h-10 pl-10 pr-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <HiSearch className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
