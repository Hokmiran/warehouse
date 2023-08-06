import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { resetPassword } from "../../services/authService";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./auth.css";

const initialState = {
    password: "",
    password2: "",
};

const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return [showPassword, togglePasswordVisibility];
};

const Reset = () => {
    const [formData, setFormData] = useState(initialState);
    const { password, password2 } = formData;
    const [page, setPage] = useState(false);

    const { resetToken } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const reset = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            return toast.error("Passwords must be up to 6 characters");
        }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }

        const userData = {
            password,
            password2,
        };

        try {
            const data = await resetPassword(userData, resetToken);
            toast.success(data.message);
            setPage(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const [showPassword, togglePasswordVisibility] = usePasswordVisibility();
    const [resetShowPassword, toggleResetPasswordVisibility] = usePasswordVisibility();

    return (
        <>
            <ToastContainer />
            <div className="loginField">
                <div className="loginBox">
                    <h1 className="signText">Reset Password</h1>
                    <Box component="form" onSubmit={reset}>
                        <TextField
                            fullWidth
                            label="New Password"
                            placeholder="New Password"
                            margin="normal"
                            type={showPassword ? "text" : "password"}
                            required
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            type={resetShowPassword ? "text" : "password"}
                            required
                            label="Confirm New Password"
                            placeholder="Confirm New Password"
                            name="password2"
                            value={password2}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleResetPasswordVisibility}
                                            edge="end"
                                        >
                                            {resetShowPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "20px" }}
                        >
                            Reset Password
                        </Button>
                        {
                            page
                                ?
                                <p>
                                    <Link to="/login">Login</Link>
                                </p>
                                :
                                ""
                        }

                    </Box>
                </div>
            </div>
        </>
    );
};

export default Reset;
