import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_REACT_API_URL;

function ResetPassword() {
    const { resetToken } = useParams()
    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required("* Password is required !")
            .min(8, "* Password should be at least 8 characters !"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "* Passwords do not match")
            .required("* Confirm Password is required !"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
    });
    const [loginPage, setLoginPage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = async (data) => {
        try {
            await resetPassword(data, resetToken);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const resetPassword = async (userData, resetToken) => {
        try {
            const response = await axios.put(
                `${BACKEND_URL}/users/reset-password/${resetToken}`,
                userData
            );
            toast.success(response.data.message);
            setLoginPage(true);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
        }
    };

    return (
        <div className="bg" style={{ height: 100 }}>
            <ToastContainer />
            <div className="columns ">
                <div className="login-box">
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div className="signin">
                            <h1 className="topline">Reset Password</h1>
                            <br />
                            <div className="input-field">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="* New Password"
                                    {...register("password")}
                                />
                                <div className="password-toggle-button" onClick={togglePasswordVisibility}>
                                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="error-message">{errors.password.message}</p>
                            )}
                            <div className="input-field">
                                <div>
                                    <input
                                        id="password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="* Confirm New Password"
                                        {...register("confirmPassword")}
                                    />
                                </div>
                                <div className="password-toggle-button" onClick={toggleConfirmPasswordVisibility}>
                                    <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <p className="error-message">{errors.confirmPassword.message}</p>
                            )}
                            <div className="login-box-button">
                                <button type="submit" style={{ cursor: 'pointer', fontWeight: "normal" }}>
                                    Reset Password
                                </button>
                            </div>
                            {loginPage && ( 
                                <div style={{marginTop: 10}} className="back-to-login">
                                       <a href="/login">
                                        <i className="fas fa-arrow-left"></i> Back to Login Page
                                    </a>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
