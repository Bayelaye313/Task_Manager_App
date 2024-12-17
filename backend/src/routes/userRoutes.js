const express = require("express");

const {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/goalsControllers");

const router = express.Router();

router.route("/").get(getUser).post(registerUser);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
