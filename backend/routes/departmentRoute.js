const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createDepartment,
  getDepartment,
  deleteDepartment,
  updateDepartment,
} = require("../controllers/departmentController");

router.post("/create", protect, createDepartment);
router.get("/list", protect, getDepartment);
router.put("/:id/update", protect, updateDepartment);
router.delete("/:id/delete", protect, deleteDepartment);

module.exports = router;

