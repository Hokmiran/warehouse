import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSplash from "./components/LoadingSplash/LoadingSplash";
// import { useSelector } from "react-redux";
import Guard from "./components/Guard/Guard";
// import Teachers from "./views/Teachers/Teachers";
// import TeacherEdit from "./views/Teachers/TeacherEdit";

import Products from "./views/Products/Products";
import ProductCreate from "./views/Products/ProductCreate";
import ProductEdit from "./views/Products/ProductEdit";
// import TeacherRequests from "./views/Teachers/TeacherRequests";
import LessonCreate from "./views/Lessons/LessonCreate";
import LessonEdit from "./views/Lessons/LessonEdit";
import Contact from "./views/Contact/Contact";
import ContactRequests from "./views/Contact/ContactRequests";
import Home from "./views/Content/Home";
import About from "./views/Content/About";
import Courses from "./views/Content/Courses";
import ContactUs from "./views/Content/ContactUs";
import ForgotPassword from "./views/forgot/ForgotPassword";
import ResetPassword from "./views/reset/ResetPassword";
import AddUser from "./views/Teachers/AddUser";
import CategoryList from "./views/Products/CategoryList";
import ProductCategory from "./views/Products/ProductCategory";
import Department from "./views/Department/Department";
import CreateDepartment from "./views/Department/CreateDepartment";
import EditDepartment from "./views/Department/EditDEpartment";
import Positions from "./views/Position/Positions";
import CreatePosition from "./views/Position/CreatePosition";
import EditPosition from "./views/Position/EditPosition";

const Login = lazy(() => import("./views/Login/Login"));
const Dashboard = lazy(() => import("./views/Dashboard/Dashboard"));

let routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: (
      <Guard>
        <Dashboard />
      </Guard>
    ),
  },
  {
    path: "/products-category",
    element: (
      <Guard>
        <CategoryList />
      </Guard>
    ),
  },
  {
    path: "/products-category/:id",
    element: (
      <Guard>
        < ProductCategory />
      </Guard>
    ),
  },
  {
    path: "/products",
    element: (
      <Guard>
        <Products />
      </Guard>
    ),
  },
  {
    path: "/product/create",
    element: (
      <Guard>
        <ProductCreate />
      </Guard>
    ),
  },
  {
    path: "/product/:id/edit",
    element: (
      <Guard>
        <ProductEdit />
      </Guard>
    ),
  },
  {
    path: "/departments",
    element: (
      <Guard>
        <Department />
      </Guard>
    ),
  },
  {
    path: "/department/create",
    element: (
      <Guard>
        <CreateDepartment />
      </Guard>
    ),
  },
  {
    path: "/department/:id/edit",
    element: (
      <Guard>
        <EditDepartment />
      </Guard>
    ),
  },
  {
    path: "/add-user",
    element: (
      <Guard>
        <AddUser />
      </Guard>
    ),
  },
  {
    path: "/lessons/create",
    element: (
      <Guard>
        <LessonCreate />
      </Guard>
    ),
  },
  {
    path: "/lessons/:id/edit",
    element: (
      <Guard>
        <LessonEdit />
      </Guard>
    ),
  },

  {
    path: "/contact",
    element: (
      <Guard>
        <Contact />
      </Guard>
    ),
  },
  {
    path: "/contact/requests",
    element: (
      <Guard>
        <ContactRequests />
      </Guard>
    ),
  },
  // resources
  {
    path: "/positions",
    element: (
      <Guard>
        <Positions />
      </Guard>
    ),
  },
  {
    path: "/position/create",
    element: (
      <Guard>
        <CreatePosition />
      </Guard>
    ),
  },
  {
    path: "/position/:id/edit",
    element: (
      <Guard>
        <EditPosition />
      </Guard>
    ),
  },
  // content
  {
    path: "/content/home",
    element: (
      <Guard>
        <Home />
      </Guard>
    ),
  },
  {
    path: "/content/about",
    element: (
      <Guard>
        <About />
      </Guard>
    ),
  },
  {
    path: "/content/courses",
    element: (
      <Guard>
        <Courses />
      </Guard>
    ),
  },
  {
    path: "/content/contact-us",
    element: (
      <Guard>
        <ContactUs />
      </Guard>
    ),
  },
];
function App() {
  return (
    <Routes>
      {routes.map((index) => {
        return (
          <Route
            key={index.path}
            path={index.path}
            element={
              <Suspense fallback={<LoadingSplash />}>
                {index.element}
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
