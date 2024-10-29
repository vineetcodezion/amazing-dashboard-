// src/features/order/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/orders/all/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Asynchronous thunk to update an order
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ orderId, status, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/orders/${orderId}/update-order`,
        { status }, // Sending status as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Including the token in the headers
          },
        }
      );
      return response.data; // assuming the response returns the updated order
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle any errors
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///////////////////////////////////
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Find and update the order in the state
        const index = (state.orders?.data?.orders || []).findIndex(
          (order) => order.orderId === action.payload.orderId
        );

        console.log(index);
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the order with the new data
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

export default orderSlice.reducer;
