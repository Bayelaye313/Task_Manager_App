const express = require("express");

const {
  getGoal,
  setUser,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsControllers");

const router = express.Router();

router.route("/").get(getGoal).post(setUser);
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
