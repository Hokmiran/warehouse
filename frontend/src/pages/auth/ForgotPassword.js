import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../services/authService";
import "react-toastify/dist/ReactToastify.css";



const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const forgot = async (e) => {
        e.preventDefault();
        if (!email) {
            return toast.error("Please enter an email");
        }

        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }

        const userData = {
            email,
        };

        await forgotPassword(userData);
        setEmail("");
    };

    return (
        <>
            <ToastContainer />
            <div className="loginField">
                <div className="loginBox">
                    <h1 className='signText'>Forgot Password</h1>
                    <Box component="form" onSubmit={forgot}>
                        <div className="--flex-center">
                            {/* Add your icon here, e.g., <AiOutlineMail size={35} color="#999" /> */}
                        </div>


                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            type="email"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "20px" }}
                        >
                            Get Reset Email
                        </Button>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
