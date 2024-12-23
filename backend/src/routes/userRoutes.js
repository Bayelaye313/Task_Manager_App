const express = require("express");
const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
} = require("../controllers/authControllers");
const { protect, adminMiddleware } = require("../middleware/authMiddleware");
const deleteUser = require("../controllers/adminControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/user").get(protect, getUser);
router.route("/user").patch(protect, updateUser);

//admin routes
router.route("/admin/users/:id").delete(protect, adminMiddleware, deleteUser);

module.exports = router;
