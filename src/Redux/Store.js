// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./../Features/auth/AuthSlice"; // Import the auth slice
import orderReducer from "./../Features/Orders/OrderSlice"; // Import the auth slice
import productReducer from "./../Features/Products/ProductSlice";
import imageReducer from "./../Features/Images/ImageSice";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // key for the storage
  storage, // storage engine to use (localStorage in this case)
  whitelist: ["auth"], // only persist the auth slice
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Use the persisted reducer
    orders: orderReducer,
    products: productReducer,
    imageAll: imageReducer,
  },
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor
