import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { privateAxios } from "../../utils/privateAxios";

function Sidebar() {
  const loc = useLocation();
  const [toggle, setToggle] = useState({
    first: true,
    second: true,
    third: true,
  });

  const [contactCount, setContactCount] = useState(0);

  const getContacts = async () => {
    try {
      const res = await privateAxios.get(
        "/admin/contact-message/notifications"
      );
      setContactCount(res.data.data);
    } catch (error) {
      setContactCount(0);
    }
  };
  useEffect(() => {
    getContacts();
  }, []);
  return (
    <div className="app-sidebar sidebar-shadow" style={{ overflowY: "scroll" }}>
      <div className="app-header__logo">
        <div className="logo-src"></div>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
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
      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu">
            <li className="app-sidebar__heading"></li>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "mm-active" : ""
                }
              >
                <i className="metismenu-icon pe-7s-rocket"></i>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products-category"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "mm-active" : ""
                }
              >
                <i className="metismenu-icon pe-7s-diamond"></i>
                Products Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "mm-active" : ""
                }
              >
                <i className="metismenu-icon pe-7s-diamond"></i>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/departments"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "mm-active" : ""
                }
              >
                <i className="metismenu-icon pe-7s-notebook"></i>
                Departments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/positions"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "mm-active" : ""
                }
              >
                <i className="metismenu-icon pe-7s-paperclip"></i>
                Positions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/employees"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "mm-active" : ""
                }
              >
                <i className="metismenu-icon pe-7s-add-user"></i>
                Employees
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "mm-active" : ""
                }
              >
                <i className="metismenu-icon pe-7s-add-user"></i>
                Products Transactions
              </NavLink>
            </li>
            <li
              className={toggle.second ? " " : "mm-active"}
              onClick={() => setToggle({ ...toggle, second: !toggle.second })}
            >
              <a
                href="#"
                className={
                  loc.pathname.includes("contact") &&
                    !loc.pathname.includes("contact-us")
                    ? "mm-active"
                    : ""
                }
              >
                <i className="metismenu-icon pe-7s-add-user"></i>
                <span>
                  Contacts{" "}
                  {contactCount > 0 ? (
                    <span className="badge badge-pill badge-info">
                      {contactCount}
                    </span>
                  ) : (
                    <></>
                  )}
                </span>

                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
              </a>
              <ul
                className={
                  toggle.second ? "mm-collapse" : "mm-collapse mm-show "
                }
              >
                <li>
                  <NavLink to="/contact">
                    <i className="metismenu-icon"></i>
                    Contacts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact/requests">
                    <i className="metismenu-icon"></i>
                    Requests{" "}
                    {contactCount > 0 ? (
                      <span className="badge badge-pill badge-info">
                        {contactCount}
                      </span>
                    ) : (
                      <></>
                    )}
                  </NavLink>
                </li>
              </ul>
            </li>
            <li
              className={toggle.third ? " " : "mm-active"}
              onClick={() => setToggle({ ...toggle, third: !toggle.third })}
            >
              <a
                href="#"
                className={loc.pathname.includes("content") ? "mm-active" : ""}
              >
                <i className="metismenu-icon pe-7s-add-user"></i>
                <span>Content </span>

                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
              </a>
              <ul
                className={
                  toggle.third ? "mm-collapse" : "mm-collapse mm-show "
                }
              >
                <li>
                  <NavLink to="/content/home">
                    <i className="metismenu-icon"></i>
                    Home page
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/content/about">
                    <i className="metismenu-icon"></i>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/content/courses">
                    <i className="metismenu-icon"></i>
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/content/contact-us">
                    <i className="metismenu-icon"></i>
                    Contact us
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
