import React, { Fragment, useEffect, useState } from "react";
import { FaBox } from "react-icons/fa6";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import { ImUpload } from "react-icons/im";
import Cookies from "js-cookie";
import { IoNotifications } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";

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
import Header from "../Layouts/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyAuth } from "../Features/auth/AuthSlice";

// Register the necessary chart components
ChartJS.register(
  ArcElement, // For pie chart
  BarElement, // For bar chart
  CategoryScale, // For bar chart's X-axis
  LinearScale, // For bar chart's Y-axis
  Tooltip, // For tooltips
  Legend, // For chart legends
  Filler // For the fill option
);

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mapsData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [100, 59, 80, 81, 56, 55, 402],
      fill: true,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.4, // This creates the curve effect
      pointRadius: 5, // Adjust point size
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Months",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Sales",
      },
    },
  },
};

const data = [
  {
    name: "Pending Orders",
    qty: 6,
    icon: "/assets/box-icon.png",
    labelcolor: "3766E8",
  },
  {
    name: "Download Labels",
    qty: 0,
    icon: "/assets/box-icon-1.png",
    labelcolor: "F16A1B",
  },
  {
    name: "Out Of Stocks",
    qty: 5,
    icon: "/assets/box-icon-2.png",
    labelcolor: "17904B",
  },
  {
    name: "Low Stocks",
    qty: 12,
    icon: "/assets/box-icon-3.png",
    labelcolor: "C03221",
  },
];

const pieData = {
  labels: ["Category A", "Category B", "Category C"],
  datasets: [
    {
      data: [30, 50, 20],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const barData = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Sales",
      data: [12000, 19000, 3000, 5000],
      backgroundColor: "#36A2EB",
    },
  ],
};

const pieOptions = {
  responsive: true,
};

const barOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Verify if the admin is authenticated
    dispatch(verifyAuth())
      .unwrap()
      .then(() => {
        if (isAuthenticated) {
          navigate("/"); // Redirect to homepage if authenticated
        }
      })
      .catch((error) => {
        console.log("Not authenticated", error);
      });
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div className="h-screen w-full">
      <div
        className="h-[200px] rounded-bl-3xl rounded-br-3xl overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/vector.png')" }}
      >
        {/* /////////////// */}
        <Header title="Dashoard" />
        {/* /////////////////// */}

        <div className="mt-5 px-10 flex flex-row justify-between items-center">
          {data &&
            data.map((d, i) => (
              <Fragment key={i}>
                <div className="bg-white  px-3 flex justify-between items-center py-4 rounded-md w-[300px]">
                  <img
                    className="w-[60px] h-[60px] object-contain"
                    src={d.icon}
                    alt=""
                  />
                  <div className="flex flex-col justify-center">
                    <h1 className="text-muted font-bold text-gray-400">
                      {d.name}
                    </h1>
                    <h1
                      className={`text-muted text-2xl text-end font-bold`}
                      style={{ color: `#${d.labelcolor}` }}
                    >
                      {d.qty}
                    </h1>
                  </div>
                </div>
              </Fragment>
            ))}
        </div>
      </div>

      {/* ================ MAIN CONTENT ============================= */}

      <div className="flex flex-row  h-3/2 w-full px-10 mt-10 rounded-xl overflow-hidden">
        <div className="w-[60%]  p-4 border-2">
          <h2 className="text-lg font-bold">
            <span className="text-muted text-gray-500">Sales Data</span> :
            15,0000
          </h2>
          <Line data={mapsData} options={options} />
        </div>
        <div className="w-[40%] min-h-auto justify-center  p-4 grid grid-cols-2 gap-4 overflow-hidden">
          <div className="bg-[#2563EB] shadow-indigo-200 flex flex-col justify-center  rounded-lg shadow-xl border-2 p-2">
            <div className="px-4 flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-md text-muted font-semibold">
                  Views
                </p>
                <h1 className="text-white text-2xl font-bold">25,000</h1>
              </div>
              <div className="flex flex-col gap-y-2">
                <img className="w-[20px]" src="/assets/icon-btn.png" alt="" />
                <span className="flex flex-row items-center gap-x-2">
                  <IoIosArrowDropupCircle className="text-green-500 text-lg font-bold" />
                  <p className="text-green-500 text-sm font-bold">6.4%</p>
                </span>
              </div>
            </div>
            <img
              src="/assets/g1.png"
              alt="Card 1"
              className="w-3/4 h-1/2 rounded-lg mt-10 px-2"
            />
          </div>
          <div className="bg-[#BFEBFF] shadow-indigo-200 flex flex-col justify-center rounded-lg shadow-xl border-2 p-2 bottom-0">
            <div className="px-4 flex items-center justify-between">
              <div>
                <p className="text-[#6c98f7] text-md text-muted font-semibold">
                  Orders
                </p>
                <h1 className="text-[#2563EB] text-2xl font-bold">25,000</h1>
              </div>
              <div className="flex flex-col gap-y-2">
                <img className="w-[20px]" src="/assets/icon-btn.png" alt="" />
                <span className="flex flex-row items-center gap-x-2">
                  <IoIosArrowDropupCircle className="text-green-500 text-lg font-bold" />
                  <p className="text-green-500 text-sm font-bold">6.4%</p>
                </span>
              </div>
            </div>
            <img
              src="/assets/g1.png"
              alt="Card 2"
              className="w-[200px]  rounded-lg mt-10 px-2"
            />
          </div>
          <div className="bg-[#c18ef1] shadow-indigo-200 flex flex-col justify-center rounded-lg  shadow-xl border-2 p-2">
            <div className="px-4 flex items-center justify-between">
              <div>
                <p className="text-[#dbc0f5] text-md text-muted font-semibold">
                  Orders
                </p>
                <h1 className="text-[#ffffff] text-2xl font-bold">25,000</h1>
              </div>
              <div>
                <img src="/assets/icon-btn2.png" alt="" />
              </div>
            </div>
            <img
              src="/assets/Chart.png"
              alt="Card 3"
              className="w-full h-[100px] rounded-lg mt-10 px-2"
            />
          </div>
          <div className="bg-[#E2C8FF] shadow-indigo-200 flex flex-col justify-center rounded-lg   shadow-xl border-2 p-2">
            <div className="px-4 flex items-center justify-between">
              <div>
                <p className="text-[#b17eeb] text-md text-muted font-semibold">
                  Orders
                </p>
                <h1 className="text-[#9e59ec] text-2xl font-bold">25,000</h1>
              </div>
              <div className="flex flex-col gap-y-2">
                <img className="w-[20px]" src="/assets/icon-btn2.png" alt="" />
                <span className="flex flex-row items-center gap-x-2">
                  <IoIosArrowDropupCircle className="text-green-500 text-lg font-bold" />
                  <p className="text-green-500 text-sm font-bold">6.4%</p>
                </span>
              </div>
            </div>
            <img
              src="/assets/g2.png"
              alt="Card 4"
              className="w-[200px]  rounded-lg mt-10 px-2"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row  px-4 md:px-10 mt-10 gap-6">
        {/* Pie Chart Card */}
        <div className="w-full border-4 lg:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Pie Chart</h2>
          <div className="w-[300px]">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="w-full border-4 lg:w-1/3 bg-white p-6 rounded-lg shadow-2xl flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Bar Chart</h2>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Info Card */}
        <div className="w-full border-3 lg:w-1/3 bg-white  rounded-lg shadow-2xl border-2  text-white">
          <div className="border-b-2 flex flex-row justify-between pb-3 p-6">
            <div className="flex flex-col items-center gap-y-2">
              <h1 className="text-black text-2xl font-bold">750K</h1>
              <span className="text-muted text-gray-400 font-semibold">
                Website Visitors
              </span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <h1 className="text-black text-2xl font-bold">7,500</h1>
              <span className="text-muted text-gray-400 font-semibold">
                New Visitors
              </span>
            </div>
          </div>
          <div className="flex flex-col px-5 mt-5">
            <h1 className="text-xl font-bold text-gray-700">
              Important Announcements{" "}
            </h1>
            <span className="cursor-pointer w-full text-gray-900 bg-gray-200 px-4 flex flex-row items-center justify-between py-2 rounded-md mt-5">
              <span className="bg-gray-900 p-1 rounded-md">
                <BiCalendar className="text-white text-xl" />
              </span>
              DreamKart April Daily Deals
              <span className="text-xl">
                <IoIosArrowDropright />
              </span>
            </span>
            <span className="cursor-pointer w-full text-gray-900 bg-gray-200 px-4 flex flex-row items-center justify-between py-2 rounded-md mt-5">
              <span className="bg-gray-900 p-1 rounded-md">
                <MdOutlineSettingsInputAntenna className="text-white text-xl" />
              </span>
              DreamKart April Daily Deals
              <span className="text-xl">
                <IoIosArrowDropright />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
