import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../Features/Products/ProductSlice";

const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.products?.selectedProduct
  );

  // Initialize formData state outside of any conditions
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    manufacturer: "",
    stock: "",
    colors: "",
    sizes: "",
    fitShape: "",
    netWeight: "",
    pattern: "",
    sizeChartImage: "",
    variations: [],
  });

  // Effect to update formData when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        manufacturer: product.manufacturer,
        stock: product.stock,
        colors: product.colors.join(", "),
        sizes: product.sizes.join(", "),
        fitShape: product.fitShape,
        netWeight: product.netWeight,
        pattern: product.pattern,
        sizeChartImage: product.sizeChartImage,
        variations: product.variations,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleVariationChange = (index, field, value) => {
    setFormData((prevData) => {
      const newVariations = prevData.variations.map((variation, idx) => {
        if (idx === index) {
          return { ...variation, [field]: value }; // Create a new object with updated field
        }
        return variation; // Return existing variation unchanged
      });
      return { ...prevData, variations: newVariations };
    });
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      colors: formData.colors.split(",").map((color) => color.trim()),
      sizes: formData.sizes.split(",").map((size) => size.trim()),
    };

    // Dispatch the update action and handle the onClose in a .then() block
    dispatch(
      updateProduct({ id: selectedProduct?._id, productData: updatedData })
    )
      .unwrap() // This allows catching any errors
      .then(() => {
        // After the update is successful, you can call onSave if you need to
        onSave(updatedData);
        onClose(); // Close the modal only after the update is successful
      })
      .catch((error) => {
        console.error("Failed to update the product: ", error);
        // Handle error here if necessary (like showing an error message)
      });
  };

  // If the modal is not open or the product is null, return null
  if (!isOpen || !product) return null;

  return (
    <div className="fixed overflow-y-auto inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-[700px] overflow-y-auto p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            placeholder="Manufacturer"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="colors"
            value={formData.colors}
            onChange={handleInputChange}
            placeholder="Colors (comma-separated)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="sizes"
            value={formData.sizes}
            onChange={handleInputChange}
            placeholder="Sizes (comma-separated)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="fitShape"
            value={formData.fitShape}
            onChange={handleInputChange}
            placeholder="Fit Shape"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="netWeight"
            value={formData.netWeight}
            onChange={handleInputChange}
            placeholder="Net Weight (g)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="pattern"
            value={formData.pattern}
            onChange={handleInputChange}
            placeholder="Pattern"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="sizeChartImage"
            value={formData.sizeChartImage}
            onChange={handleInputChange}
            placeholder="Size Chart Image"
            className="w-full p-2 border rounded"
          />

          {/* Variations Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Variations</h3>
            {formData.variations.map((variation, index) => (
              <div key={variation._id} className="space-y-2">
                <input
                  type="text"
                  value={variation.size}
                  placeholder="Size"
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
                <input
                  type="text"
                  value={variation.color}
                  placeholder="Color"
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
                <input
                  type="number"
                  value={variation.stock}
                  placeholder="Stock"
                  onChange={(e) =>
                    handleVariationChange(index, "stock", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
