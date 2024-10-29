import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrder } from "../Features/Orders/OrderSlice";
import StatusModal from "./StatusModal";

const InventoryTable = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const orders = useSelector((state) => state.orders.orders.data?.orders) || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchOrders(token)).finally(() => setLoading(false));
  }, [dispatch, token]);

  const filteredOrders = orders.filter((item) =>
    [item.email, item.orderId, item.status].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = (status) => {
    if (selectedOrder) {
      setLoading(true);
      dispatch(updateOrder({ orderId: selectedOrder.orderId, status, token }))
        .then(() => dispatch(fetchOrders(token))) // Fetch updated orders
        .finally(() => setLoading(false)); // Stop loading after fetch
    }
    setIsModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="relative overflow-x-auto shadow-md">
      <div className="flex rounded-lg items-center mb-4 max-w-[700px] mx-auto mt-5 border border-gray-300 px-2">
        <input
          type="text"
          placeholder="Search by product name, quantity, or status"
          className="px-4 py-2 w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FaSearch className="text-gray-400" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="loader border-t-4 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
            <tr>
              <th scope="col" className="p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Variation
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item.productId}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="w-4 p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <img
                    src="/assets/ad.png"
                    alt="Product"
                    className="w-12 h-12 rounded object-contain"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 flex flex-col font-medium text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs"
                >
                  <span>User: {item.email}</span>
                  <span className="font-normal text-gray-500">
                    Order Id: {item.orderId}
                  </span>
                  <span className="font-normal text-gray-500">
                    Product Id: {item.productId}
                  </span>
                </th>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.totalAmount}</td>
                <td className="px-6 py-4">{item.selectedSize}</td>
                <td className="flex items-center justify-center px-6 py-4">
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className={`hover:underline flex items-center gap-2 ${
                        item.status === "Pending"
                          ? "text-orange-400"
                          : "text-green-400"
                      }`}
                    >
                      <IoWarning /> {item.status}
                    </a>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="font-medium flex items-center gap-2 bg-blue-600 px-3 py-2 rounded-md text-white"
                    >
                      <FaEdit className="text-sm" /> Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex items-center justify-between py-4 px-4">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {indexOfFirstItem + 1}-
            {indexOfLastItem > filteredOrders.length
              ? filteredOrders.length
              : indexOfLastItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-800">
            {filteredOrders.length}
          </span>{" "}
          results
        </div>
        <nav
          className="inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-white text-sm font-medium text-gray-700">
            {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>

      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default InventoryTable;
