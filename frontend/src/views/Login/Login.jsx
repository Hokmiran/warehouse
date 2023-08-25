// import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import { publicAxios } from "../../utils/publicAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const dispatch = useDispatch();
  const nav = useNavigate();
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("* Email is required !")
      .email("* Field should contain a valid e-mail !"),
    password: Yup.string().required("* Password is required !"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const postLogin = async (data) => {
    try {
      let res = await publicAxios.post("/users/login", data);
      const tokens = {
        ...res.data,
      };
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      dispatch(authenticate());
      nav("/");
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="bg" style={{ height: 100 }}>
      <ToastContainer />
      <div className="columns ">
        <div className="login-box">
          <form onSubmit={handleSubmit(postLogin)} className="form">
            <div className="signin">
              <h1 className="topline">Login</h1>
              <br />
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="* Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="* Password"
                  {...register("password")}
                />
                <div className="password-toggle-button" onClick={handleTogglePassword}>
                  <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </div>
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>
              <div className="forgot-password-link">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
              <div className="login-box-button">
                <button type="submit" style={{ cursor: 'pointer' }}>
                  <i className="fas fa-sign-in-alt"></i>
                  <span style={{ marginLeft: "0.5rem", fontWeight: "normal" }}>Log In</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
