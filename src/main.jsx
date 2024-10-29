import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import the Provider from Redux
import { store } from "./Redux/Store.js"; // Import your Redux store
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* Wrap your App in Provider */}
      <App />
    </Provider>
  </StrictMode>
);
