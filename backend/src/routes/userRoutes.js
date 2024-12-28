const express = require("express");
const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  loginStatus,
  verifyEmail,
} = require("../controllers/authControllers");
const {
  protect,
  adminMiddleware,
  creatorMiddleware,
} = require("../middleware/authMiddleware");
const { deleteUser, getAllUsers } = require("../controllers/adminControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/user").get(protect, getUser);
router.route("/user").patch(protect, updateUser);

//admin routes
router.route("/admin/users/:id").delete(protect, adminMiddleware, deleteUser);
router.route("/admin/users").get(protect, creatorMiddleware, getAllUsers);

//login Status
router.route("/login-status").get(protect, loginStatus);

//email verification
router.route("/verify-email").post(protect, verifyEmail);

module.exports = router;
