import React, { Fragment, useState } from "react";

import { IoNotifications } from "react-icons/io5";

import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const Header = ({ title }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-10 py-4">
        <h1 className="font-bold text-white text-xl -tracking-tight">
          {title}
        </h1>
        <div className="flex flex-row items-center space-x-4">
          <span className="text-gray-100 text-xl opacity-85 p-1 rounded-md">
            <IoNotifications />
          </span>
          <span className="text-gray-100 text-xl opacity-85  rounded-md">
            <BsFillChatSquareDotsFill />
          </span>
          <div className="flex flex-row items-center space-x-4">
            <img
              className="w-10 h-10 rounded-full "
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727049600&semt=ais_hybrid"
              alt="avatar"
            />
            <div className="flex flex-col items-start">
              <p className="text-white font-bold text-md">{user.email}</p>
              <p className="text-gray-100 font-normal text-sm">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
