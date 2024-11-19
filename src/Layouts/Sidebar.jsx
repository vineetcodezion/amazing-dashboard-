import { Fragment, useState } from 'react';
import { FaBox, FaDropbox, FaMoneyBill, FaUsers } from 'react-icons/fa6';
import { HiOutlineArrowUturnRight } from 'react-icons/hi2';
import { LuImagePlus } from 'react-icons/lu';
import { IoBagHandle } from 'react-icons/io5';
import { MdOutlineSettingsInputAntenna, MdDashboard } from 'react-icons/md';
import { ImUpload } from 'react-icons/im';
import { IoIosArrowDropdownCircle, IoIosWallet } from 'react-icons/io';
import { GrCertificate } from 'react-icons/gr';
import { BiSolidOffer } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineProduct, AiOutlineThunderbolt } from 'react-icons/ai';
import { SiSocialblade } from 'react-icons/si';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleInventory = () => setInventoryOpen(!inventoryOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <Fragment>
      <div
        className={`flex flex-col h-[1300px] sticky top-0 left-0 items-start bg-white shadow-2xl ${
          isCollapsed ? 'w-[80px]' : 'w-[300px]'
        } border-r-2 space-y-4 transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex border-b-2 py-1 items-center w-full justify-center">
          <div
            className={`flex items-center justify-between ${
              isCollapsed ? 'w-[50px]' : 'w-3/4'
            } h-[80px]`}
          >
            {!isCollapsed ? (
              <img
                className="object-contain w-3/4 h-full"
                src="/assets/Logo.png"
                alt="dreamkart"
              />
            ) : (
              <h1 className="text-center text-2xl font-bold text-[#3766E8]">
                DK
              </h1>
            )}
            <img
              onClick={toggleSidebar}
              className="cursor-pointer w-[30px] border-4 border-gray-100 rounded-full absolute -right-[10px] object-contain"
              src="/assets/dash.png"
              alt=""
            />
          </div>
        </div>
        {/* Sidebar Main Content */}
        <div className="flex flex-col space-y-4 px-2 w-full">
          {/* Dashboard */}
          <Link
            to="/"
            className={`flex flex-row items-center text-gray-800 space-x-4 px-4 rounded-md ${
              isActive('/')
                ? 'bg-[#3766E8] text-white'
                : 'text-gray-600 hover:bg-[#3766e8]'
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <MdDashboard />
            </span>
            {!isCollapsed && (
              <span className={`${isActive('/') && 'text-white'}`}>
                Dashboard
              </span>
            )}
          </Link>

          <h3
            className={`text-lg px-4 font-semibold text-muted text-gray-400 ${
              isCollapsed ? 'hidden' : ''
            }`}
          >
            Manage Business
          </h3>

          {/* Orders */}
          <Link
            to="/orders"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive('/orders')
                ? 'bg-[#3766E8] text-white'
                : 'text-gray-600 hover:bg-[#3766e8] hover:text-gray-700'
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <FaBox />
            </span>
            {!isCollapsed && <span className="text-md">Orders</span>}
          </Link>

          {/* Returns */}
          <div className="flex cursor-pointer text-gray-600 hover:bg-[#3766e8] hover:text-white transition-all flex-row items-center space-x-4 px-5 rounded-md py-2">
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <HiOutlineArrowUturnRight />
            </span>
            {!isCollapsed && <span className="text-md">Returns</span>}
          </div>

          {/* Inventory Section with Dropdown */}
          <div className="flex flex-col">
            <div
              onClick={toggleInventory}
              className={`flex cursor-pointer text-gray-600 hover:bg-[#3766e8] hover:text-white transition-all flex-row items-center space-x-4 px-4 rounded-md py-2`}
            >
              <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
                <IoBagHandle />
              </span>
              {!isCollapsed && (
                <span className="text-md flex flex-row items-center gap-3">
                  <span>Inventory</span>
                  <span>
                    <IoIosArrowDropdownCircle className="text-lg" />
                  </span>
                </span>
              )}
            </div>
            {inventoryOpen && !isCollapsed && (
              <div className="flex flex-col pl-12 space-y-5 mt-5 mb-5">
                <Link
                  to="/inventory"
                  className="text-gray-600 hover:text-[#3766E8]"
                >
                  Inventory
                </Link>
                <Link
                  to="/category-creation"
                  className="text-gray-600 hover:text-[#3766E8]"
                >
                  Create Category
                </Link>
                <Link
                  to="/create-subcategory"
                  className="text-gray-600 hover:text-[#3766E8]"
                >
                  Create Subcategory
                </Link>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-[#3766E8]"
                >
                  Product Uploads
                </Link>
              </div>
            )}
          </div>

          {/* Catalog Uploads */}
          <Link
            to="/catalog"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive('/catalog')
                ? 'bg-[#3766E8] text-white'
                : 'text-gray-600 hover:bg-[#3766e8] hover:text-gray-700'
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <ImUpload />
            </span>
            {!isCollapsed && <span className="text-md">Catalog Uploads</span>}
          </Link>

          {/* Bulk Image Upload */}
          {/* <Link
            to="/bulk-image-upload"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive('/bulk-image-upload')
                ? 'bg-[#3766E8] text-white'
                : 'text-gray-600 hover:bg-[#3766e8] hover:text-gray-700'
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <LuImagePlus />
            </span>
            {!isCollapsed && <span className="text-md">Bulk Image Upload</span>}
          </Link> */}

          <Link
            to="/manage-pages"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive('/manage-pages')
                ? 'bg-[#3766E8] text-white'
                : 'text-gray-600 hover:bg-[#3766e8] hover:text-gray-700'
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <AiOutlineThunderbolt />
            </span>
            {!isCollapsed && <span className="text-md">Manage Pages</span>}
          </Link>

          <Link
            to="/manage-blogs"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive('/manage-blogs')
                ? 'bg-[#3766E8] text-white'
                : 'text-gray-600 hover:bg-[#3766e8] hover:text-gray-700'
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <SiSocialblade />
            </span>
            {!isCollapsed && <span className="text-md">Manage Blogs</span>}
          </Link>

          {/* Payments */}
          <Link
            to={'/manage-pays'}
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive('/manage-pays')
                ? 'bg-[#3766E8] text-white'
                : 'text-gray-600 hover:bg-[#3766e8] hover:text-gray-700'
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <IoIosWallet />
            </span>
            {!isCollapsed && <span className="text-md">Manage Payments</span>}
          </Link>
          <Link
            to={'/manage-discount'}
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive('/manage-discount')
                ? 'bg-[#3766E8] text-white'
                : 'text-gray-600 hover:bg-[#3766e8] hover:text-gray-700'
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <BiSolidOffer />
            </span>
            {!isCollapsed && <span className="text-md">Manage Discount</span>}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
