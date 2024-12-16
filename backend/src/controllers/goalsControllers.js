const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");

const getGoal = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
const setUser = asyncHandler(async (req, res) => {
  const { name, email, password, photo, bio, role, isVerified } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: name, email, password"
    );
  }

  const user = await User.create({
    name,
    email,
    password,
    photo,
    bio,
    role,
    isVerified,
  });

  res.status(200).json(user);
});

const updateGoal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // Check if goal exists
  if (!user) {
    res.status(400);
    throw new Error("Goal with this ID not found");
  }

  console.log("Request Body:", req.body); // Log request body to see what is coming in

  const updatedGoal = await User.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text }, // Only update the text field explicitly
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("can not find error");
  }
  const deletedGoal = await Goal.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoal,
  setUser,
  updateGoal,
  deleteGoal,
};
