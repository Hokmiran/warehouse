import React, { useState } from "react";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";
import styles from "./auth.module.scss";
import Logo from "../../assets/logo.png";

const Forgot = () => {
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
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <div className={styles.loginField}>
        <div className={styles.loginBox}>
          <h2 className={styles.signText}>Forgot Password</h2>
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
              style={{ marginTop: "20px", fontSize: 14 }}
            >
              Get Reset Email
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Forgot;
