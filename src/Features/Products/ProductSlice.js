import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/products');
      return response.data; // Ensure this is the correct structure returned from the API
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update a product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:8081/api/v1/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Ensure this is the correct structure returned from the API
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8081/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the id of the deleted product for the reducer
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  products: [],
  loading: false,
  selectedProduct: null,
  error: null,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Assuming action.payload is an array
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProductIndex = (
          state.products?.data?.products || []
        ).findIndex(
          (product) => product._id === action.payload._id // Assuming _id is the identifier
        );

        if (updatedProductIndex !== -1) {
          state.products[updatedProductIndex] = action.payload; // Update the product directly
        }

        state.loading = false; // Ensure loading is set to false after the update
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exporting the action to set the selected product
export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
