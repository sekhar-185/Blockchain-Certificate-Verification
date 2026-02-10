const express = require("express");
const router = express.Router();
const authAdmin = require("../middlewares/authMiddleware");
const {
  adminLogin,
  getInstitutes,
  approveInstitute
} = require("../controllers/adminController");

// login
router.post("/login", adminLogin);

// protected
router.get("/institutes", authAdmin, getInstitutes);
router.post("/approve/:id", authAdmin, approveInstitute);

module.exports = router;
