import React from "react";

const Footer = () => {
  return (
    <div className="w-screen z-50 flex flex-row justify-between py-5 px-[50px] bg-gray-100 shadow-xl border-t-2 fixed bottom-0 left-0">
      <span className="flex flex-row gap-8">
        <h1 className="font-semibold text-md text-gray-600">Privacy Policy</h1>
        <h1 className="font-semibold text-md text-gray-600">Terms Of Use</h1>
      </span>
      <img className="w-[100px]" src="/assets/Logo.png" alt="" />
      <h1 className="font-semibold text-md text-gray-600">
        Copyright © 2024 <span className="text-[#3766E8]">DreamKart</span>
      </h1>
    </div>
  );
};

export default Footer;
