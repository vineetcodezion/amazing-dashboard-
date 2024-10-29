import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSelectedProduct,
} from "../Features/Products/ProductSlice";
import { Link } from "react-router-dom";

const CardList = ({ products }) => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.products.products.data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div className="flex flex-col h-[800px] overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products &&
        products.map((item) => (
          <div
            key={item._id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() => handleProductClick(item)}
          >
            {/* Image Placeholder */}
            <img
              src={item.image}
              alt={`Item ${item.id}`}
              className="w-20 h-20 rounded-lg object-cover"
            />

            {/* Text */}
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-sm text-gray-500">
                <span className="text-black">PID</span> : {item._id}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardList;
