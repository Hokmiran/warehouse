import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setToggle } from "../../store/site";
import { deAuthenticate } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { toggle } = useSelector((state) => state.site);

  const handleLogout = () => {
    dispatch(deAuthenticate());
  };

  return (
    <div className="app-header header-shadow">
      <div className="app-header__logo">
        <div className="logo-src"></div>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              onClick={() => dispatch(setToggle())}
              className={`hamburger close-sidebar-btn hamburger--elastic ${
                toggle ? " is-active" : ""
              }`}
              data-class="closed-sidebar"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button
            type="button"
            className="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div className="app-header__menu">
        <span>
          <button
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>
      </div>
      <div className="app-header__content">
        <div className="app-header-right">
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-right header-user-info ml-3">
                  <button
                    type="button"
                    onClick={() => handleLogout()}
                    className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example"
                  >
                    <i className="fa text-white fa-arrow-left pr-1 pl-1"></i>
                    Çıxış
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
