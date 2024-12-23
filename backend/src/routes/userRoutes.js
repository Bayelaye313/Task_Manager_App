const express = require("express");
const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
} = require("../controllers/goalsControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/user").get(protect, getUser);
router.route("/user").patch(protect, updateUser);

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
