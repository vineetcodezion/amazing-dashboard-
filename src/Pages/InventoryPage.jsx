import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Header from "../Layouts/Header";
import Tabs from "../Components/Tabs";
import { BiSolidCloudUpload } from "react-icons/bi";
import SearchBar from "../Components/Search";
import InventoryTabs from "../Components/InventoryTabs";
import { Link } from "react-router-dom";
import FilterComponent from "../Components/Filter";
import CardList from "../Components/CardList";
import InventoryTable from "../Components/InventoryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../Features/Products/ProductSlice";
import EditProductModal from "../Components/EditModal";

const InventoryPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState({});
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.products?.data); // Assuming this is the correct path to products
  const selectedProduct = useSelector(
    (state) => state.products?.selectedProduct
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(products?.products); // Initialize filtered data with all products
  }, [products?.products]);

  // Function to handle search filtering
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(products?.products); // Reset to all products if search is empty
      return;
    }

    // Filter the products based on the name field
    const filtered = products?.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filtered); // Update the filtered data state
  };
  console.log(filteredData);

  const handleEditButtonClick = () => {
    if (selectedProduct) {
      setUpdatedProductData(selectedProduct); // Set selected product data for editing
      setIsEditModalOpen(true);
    }
  };

  const handleSave = (id, updatedProductData) => {
    if (selectedProduct) {
      dispatch(updateProduct({ id, productData: updatedProductData })); // Pass updated product data
      setIsEditModalOpen(false); // Close modal after saving
    }
  };

  return (
    <Fragment>
      <div className="h-screen w-full">
        {/* Header section */}
        <div
          className="h-[200px] rounded-bl-3xl rounded-br-3xl overflow-hidden bg-cover bg-center z-10"
          style={{ backgroundImage: "url('/assets/vector.png')" }}
        >
          <Header title="Inventory" />
        </div>

        {/* Main content section */}
        <div className="w-[95%] -mt-32 z-40 m-auto h-[90vh] bg-white rounded-lg relative">
          <div className="border-b-2 flex flex-row items-center justify-between pr-5">
            <InventoryTabs />
            <SearchBar
              placeholder={"Search For Products, Sku, Variation ........"}
              onSearch={handleSearch} // Pass the search function
            />
            <button className="font-semibold flex items-center gap-3 text-sm border bg-blue-600 border-blue-600 py-2 px-2 rounded-md text-white">
              <BiSolidCloudUpload className="text-xl text-white font-bold" />
              Catalog Upload
            </button>
          </div>
          <div className="flex items-center w-full h-full bg-white">
            <div className="w-[30%] h-full">
              <h1 className="text-gray-800 font-semibold w-full border-b py-4 text-center">
                Catalog: All Stock
              </h1>

              {/* Main list */}
              <div>
                <CardList products={filteredData} /> {/* Pass filtered data */}
              </div>
            </div>
            <div className="w-[70%] h-full border-l-2 border-gray-200 p-6 flex flex-col space-y-6">
              {/* Product Image */}
              {/* Product Details */}
              {selectedProduct ? (
                <>
                  <div className="w-full">
                    <img
                      src={selectedProduct?.image}
                      alt={selectedProduct?.name}
                      className="w-[600px] h-[400px] object-cover rounded-lg shadow-lg"
                    />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {selectedProduct?.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedProduct?.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-green-600">
                          ${selectedProduct?.price}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        In Stock {selectedProduct?.stock}
                      </div>
                      <ul className="space-y-1 text-gray-700">
                        <li>
                          Color:{" "}
                          {selectedProduct?.colors?.map((color, i) => (
                            <span key={i} className="mx-3">
                              {color}
                            </span>
                          ))}
                        </li>
                        <li className="flex items-center">
                          Size:{" "}
                          {selectedProduct?.sizes?.map((size, i) => (
                            <span
                              key={i}
                              className="mx-3 rounded-full border-2 py-0 justify-center p-2"
                            >
                              {size}
                            </span>
                          ))}
                        </li>
                        <li>Style: {selectedProduct?.fitShape}</li>
                        <li>Net Weight: {selectedProduct?.netWeight} g</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={handleEditButtonClick}
                      className="flex-1 px-4 py-2 max-w-fit bg-gray-800 text-white rounded-md hover:bg-blue-700 shadow"
                    >
                      Edit Product
                    </button>
                    <button
                      // Implement delete functionality here
                      onClick={() => {
                        dispatch(deleteProduct(selectedProduct._id));
                        window.location.reload();
                      }}
                      className="flex-1 px-4 py-2 max-w-fit bg-red-600 text-white rounded-md hover:bg-blue-700 shadow"
                    >
                      Delete Product
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <iframe
                    className="mt-20"
                    src="https://lottie.host/embed/f2cb70b8-759c-4d5b-b183-f00311fdecf0/z99i8rSluX.json"
                  ></iframe>

                  <p className="text-center font-semibold text-gray-600">
                    No Product Selected From the list
                  </p>
                </>
              )}
            </div>

            <EditProductModal
              product={selectedProduct}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onSave={(updatedProductData) =>
                handleSave(selectedProduct._id, updatedProductData)
              } // Pass the updated data
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InventoryPage;
