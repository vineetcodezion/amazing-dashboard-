import React from "react";
import { useDispatch } from "react-redux";

const StatusModal = ({ isOpen, onClose, onStatusChange }) => {
  const dispatch = useDispatch();
  const handleStatusChange = (status) => {
    onStatusChange(status);

    onClose(); // Close the modal after selecting a status
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Change Order Status</h2>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => handleStatusChange("Pending")}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusChange("Shipped")}
            className="px-4 py-2 bg-yellow-300 text-gray-800 rounded"
          >
            Shipped
          </button>
          <button
            onClick={() => handleStatusChange("Delivered")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Delivered
          </button>
          {/* <button
            onClick={() => handleStatusChange("Canceled")}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Delivered
          </button> */}
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
