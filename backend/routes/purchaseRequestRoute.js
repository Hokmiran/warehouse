const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
    createRequest,
    getRequest,
    deleteRequest,
    updateRequest,
} = require("../controllers/purchaseRequest");

router.post("/create", protect, createRequest);
router.get("/list", protect, getRequest);
router.put("/:id/update", protect, updateRequest);
router.delete("/:id/delete", protect, deleteRequest);

module.exports = router;

