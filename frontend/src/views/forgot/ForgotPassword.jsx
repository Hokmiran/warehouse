// import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = import.meta.env.VITE_REACT_API_URL

function ForgotPassword() {
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required("* Email is required !")
            .email("* Field should contain a valid e-mail !"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
    });

    const onSubmit = async (data) => {
        try {
            await forgotPassword(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const forgotPassword = async (userData) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/users/forgot-password`,
                userData
            );
            toast.success(response.data.message);
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
                            <h1 className="topline">Forgot Password</h1>
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
                            <div className="login-box-button">
                                <button type="submit" style={{ cursor: 'pointer', fontWeight: "normal" }}>
                                    Get Reset Email
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
