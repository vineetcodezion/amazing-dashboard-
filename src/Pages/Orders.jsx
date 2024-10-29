import React, { Fragment } from "react";
import Sidebar from "../Layouts/Sidebar";
import Header from "../Layouts/Header";
import Tabs from "../Components/Tabs";
import { BiSolidDownload } from "react-icons/bi";
import OrdersTable from "../Components/InventoryTable";
import SearchBar from "../Components/Search";

const Orders = () => {
  return (
    <Fragment>
      <div className="h-screen w-full">
        {/* Header section */}
        <div
          className="h-[200px] rounded-bl-3xl rounded-br-3xl overflow-hidden bg-cover  bg-center z-10"
          style={{ backgroundImage: "url('/assets/vector.png')" }}
        >
          <Header title="Orders" />
        </div>

        {/* Main content section */}
        <div className="w-[95%] -mt-32 z-40 m-auto h-[90vh] bg-white rounded-lg relative ">
          <div className="border-b-2 flex flex-row items-center justify-between pr-5">
            <Tabs />
            {/* <SearchBar placeholder={"Seach for Orders......"} /> */}
            <button className="font-semibold flex items-center gap-3 text-sm border border-blue-600 py-2 px-2 rounded-md text-blue-600">
              <BiSolidDownload className="text-lg" />
              Download Orders Data
            </button>
          </div>

          <div className="">
            <OrdersTable />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;
