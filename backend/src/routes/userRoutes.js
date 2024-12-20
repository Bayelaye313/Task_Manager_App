const express = require("express");

const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/goalsControllers");

const router = express.Router();

router.route("/register").get(getUser).post(registerUser);
router.route("/login").post(loginUser);

router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
