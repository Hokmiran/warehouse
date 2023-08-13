import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TextField, InputAdornment, IconButton, Button, Box } from '@mui/material';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Logo from "../../assets/logo.png";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <>
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <div className={styles.loginField}>
        <div className={styles.loginBox}>
          <h2 className={styles.signText}>Sign In</h2>
          <Box component="form" onSubmit={login}>
            <TextField
              fullWidth
              label="Email"
              placeholder="Email"
              margin="normal"
              type="email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={password}
              onChange={handleInputChange}
              fullWidth
              label="Password"
              placeholder="Password"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <RemoveRedEyeIcon />
                      )}
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
              style={{ marginTop: "20px", fontSize: 14 }}
            >
              Login
            </Button>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              <Link to="/forgot-password">Forgot Password</Link>
            </p>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login;
