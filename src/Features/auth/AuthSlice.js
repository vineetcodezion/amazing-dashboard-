import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Define the initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Function to get a specific cookie

// Create an async thunk for logging in
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (!response.ok) {
        throw new Error("Login failed! Please check your credentials.");
      }

      const data = await response.json();

      localStorage.setItem("token", data.admin.token);

      // Store the token in cookie
      return data; // Return entire user data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create an async thunk to verify authentication
// Create an async thunk to verify authentication
export const verifyAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token"); // Retrieve the token from cookies
    if (!token) {
      throw new Error("No token found in cookies");
    }

    try {
      const response = await fetch("/api/v1/admin/auth/admin-dets", {
        // Adjust the endpoint to your actual API
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token as authorization
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const user = await response.json(); // Get the user data from the response

      console.log("gfdfddg", user);
      return user.admin; // Return the admin details from the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove("token"); // Remove token on logout
    },
    checkAuth: (state) => {
      const token = Cookies.get("token");
      if (token) {
        state.isAuthenticated = true;
        state.user = JSON.parse(token); // Parse and set the entire user object
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set entire user data
        state.isAuthenticated = true; // Set authenticated status
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set authenticated status
        state.user = action.payload; // Set user data from cookies
      });
  },
});

// Call `checkAuth` during store initialization or app load
export const { logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;

// Ensure to dispatch checkAuth during the initial load of your app
// You can do this in your component where the Redux store is initialized
// For example:
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { checkAuth } from "./path_to_your_slice";

// const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth()); // Check authentication on app load
//   }, [dispatch]);

//   return (
//     <YourAppComponents />
//   );
// };
