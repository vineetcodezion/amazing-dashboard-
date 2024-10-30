import React, { Fragment, useState } from "react";
import { FaBox } from "react-icons/fa6";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { ImUpload } from "react-icons/im";
import { IoNotifications } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropright,
  IoIosArrowDropupCircle,
  IoIosWallet,
} from "react-icons/io";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { GrCertificate } from "react-icons/gr";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { BiCalendar } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle collapse state
  };

  const isActive = (path) => location.pathname === path; // Check if the tab is active

  return (
    <Fragment>
      <div
        className={`flex flex-col h-[1300px] sticky top-0 left-0 items-start bg-white shadow-2xl ${
          isCollapsed ? "w-[80px]" : "w-[300px]"
        } border-r-2 space-y-4 transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex border-b-2  py-1 items-center w-full justify-center">
          <div
            className={`flex items-center justify-between ${
              isCollapsed ? "w-[50px]" : "w-3/4"
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
        {/* ============= Sidebar Main Content============== */}
        <div className="flex flex-col space-y-4  px-2 w-full">
          {/* Collapse Icon */}

          {/* Menu Items */}
          <Link
            to="/"
            className={`flex flex-row items-center text-gray-800 space-x-4 px-4 rounded-md ${
              isActive("/")
                ? "bg-[#3766E8] text-white"
                : "text-gray-600 hover:bg-[#3766e8]"
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <MdDashboard />
            </span>
            {!isCollapsed && (
              <span className={`${isActive("/") && "text-white"}`}>
                Dashboard
              </span>
            )}
          </Link>

          <h3
            className={`text-lg px-4 font-semibold text-muted text-gray-400 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Manage Business
          </h3>

          {/* Orders */}
          <Link
            to="/orders"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive("/orders")
                ? "bg-[#3766E8] text-white"
                : "text-gray-600 hover:bg-[#3766e8] hover:text-gray-700"
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

          {/* Inventory */}
          <Link
            to="/inventory"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive("/inventory")
                ? "bg-[#3766E8] text-white"
                : "text-gray-600 hover:bg-[#3766e8] hover:text-gray-700"
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <IoBagHandle />
            </span>
            {!isCollapsed && <span className="text-md">Inventory</span>}
          </Link>

          {/* Catalog Uploads */}
          <Link
            to="/catalog"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive("/catalog")
                ? "bg-[#3766E8] text-white"
                : "text-gray-600 hover:bg-[#3766e8] hover:text-gray-700"
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <ImUpload />
            </span>
            {!isCollapsed && <span className="text-md">Catalog Uploads</span>}
          </Link>

          {/* Bulk Image Upload */}
          <Link
            to="/products"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive("/products")
                ? "bg-[#3766E8] text-white"
                : "text-gray-600 hover:bg-[#3766e8] hover:text-gray-700"
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <LuImagePlus />
            </span>
            {!isCollapsed && <span className="text-md">Product Uploads</span>}
          </Link>
          <Link
            to="/category-creation"
            className={`flex flex-row items-center space-x-4 px-4 rounded-md ${
              isActive("/category-creation")
                ? "bg-[#3766E8] text-white"
                : "text-gray-600 hover:bg-[#3766e8] hover:text-gray-700"
            } py-2 px-2`}
          >
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <AiOutlineProduct />
            </span>
            {!isCollapsed && <span className="text-md">Create Category</span>}
          </Link>

          {/* Payments */}
          <div className="flex cursor-pointer text-gray-600 hover:bg-[#3766e8] hover:text-white transition-all flex-row items-center space-x-4 px-5 rounded-md py-2">
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <IoIosWallet />
            </span>
            {!isCollapsed && <span className="text-md">Payments</span>}
          </div>

          <h3
            className={`text-lg px-4 font-semibold text-muted text-gray-400 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Boost Sales
          </h3>

          {/* Advertisements */}
          <div className="flex cursor-pointer text-gray-600 hover:bg-[#3766e8] hover:text-white transition-all flex-row items-center space-x-4 px-5 rounded-md py-2">
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <MdOutlineSettingsInputAntenna />
            </span>
            {!isCollapsed && <span className="text-md">Advertisements</span>}
          </div>

          {/* Promotions */}
          <div className="flex cursor-pointer text-gray-600 hover:bg-[#3766e8] hover:text-white transition-all flex-row items-center space-x-4 px-5 rounded-md py-2">
            <span className="text-gray-200 font-bold text-lg bg-gray-500 p-1 rounded-md">
              <GrCertificate />
            </span>
            {!isCollapsed && <span className="text-md">Promotions</span>}
          </div>
        </div>

        {/* <div className="w-"></div> */}
      </div>
    </Fragment>
  );
};

export default Sidebar;
