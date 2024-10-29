// Layout.jsx
import { Fragment } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="flex flex-row w-screen">
        {/* ============== SIDEBAR CONTENT ====================*/}
        <Sidebar />
        {/* ============== MAIN CONTENT ====================*/}
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
