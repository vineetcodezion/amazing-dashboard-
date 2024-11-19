import React, { Fragment, useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import Header from '../Layouts/Header';
import Tabs from '../Components/Tabs';
import { BiSolidCloudUpload, BiSolidDownload } from 'react-icons/bi';
import SearchBar from '../Components/Search';
import InventoryTabs from '../Components/InventoryTabs';
import { Link } from 'react-router-dom';
import FilterComponent from '../Components/Filter';
import CardList from '../Components/CardList';
import InventoryTable from '../Components/InventoryTable';
import { FaHeadphonesAlt } from 'react-icons/fa';
import GridMenu from '../Components/GridMenu';

const ProductsPage = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (filters) => {
    console.log('Filters applied:', filters);
    // Apply filter logic here to update `filteredData`
  };

  return (
    <Fragment>
      <div className="h-screen w-full">
        {/* Header section */}
        <div
          className="h-[200px] rounded-bl-3xl rounded-br-3xl overflow-hidden bg-cover  bg-center z-10"
          style={{ backgroundImage: "url('/assets/vector.png')" }}
        >
          <Header title="Products" />
        </div>

        {/* Main content section */}
        <div className="w-[95%] -mt-32 z-40 m-auto h-[90vh] bg-white rounded-lg relative ">
          <div className="border-b-2 flex flex-row items-center justify-between pr-5">
            <h1 className="text-muted text-gray-500 font-bold px-8 py-4">
              Bulk Catalog Uplaod
            </h1>

            <button className="font-semibold flex items-center gap-3 text-sm border  border-gray-400 py-2 px-2 rounded-md text-gray-600">
              <FaHeadphonesAlt className="text-xl text-gray-600 font-bold" />
              Need Help?
            </button>
          </div>
          <p className="text-muted text-sm font-semibold text-gray-600 px-10 pt-2">
            Search Category
          </p>
          <div className="flex flex-row items-center justify-between  px-8 pt-1 pb-4 border-b">
            <SearchBar
              className="w-full"
              placeholder={'Search toys, t-hsirts, sarees....'}
            />
          </div>

          <div className=" h-full">
            {/* Header */}

            <GridMenu />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
