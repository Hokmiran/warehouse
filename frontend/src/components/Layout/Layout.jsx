import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  const { toggle } = useSelector((state) => state.site);
  return (
    <div
      className={`app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header ${
        toggle ? "" : "closed-sidebar"
      }`}
    >
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">{children}</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Layout;
