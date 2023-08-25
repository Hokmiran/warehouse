const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createDepartment,
  getDepartment,
  deleteDepartment,
  updateDepartment,
  getSingleDepartment
} = require("../controllers/departmentController");

router.post("/", protect, createDepartment);
router.get("/", protect, getDepartment);
router.get("/:id", protect, getSingleDepartment);
router.patch("/:id", protect, updateDepartment);
router.delete("/:id", protect, deleteDepartment);

module.exports = router;

