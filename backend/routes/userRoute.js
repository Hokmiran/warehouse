const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/refresh-token", refreshAccessToken);
router.get("/get-user", protect, getUser);
router.get("/logged-in", loginStatus);
router.patch("/update-user", protect, updateUser);
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

module.exports = router;
