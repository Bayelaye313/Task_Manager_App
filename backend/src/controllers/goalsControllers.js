const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");

const getUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, photo, bio, role, isVerified } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: name, email, password"
    );
  }
  //check password length
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password length must be at least 6 characters");
  }
  //check if user already exist
  const userExisted = User.findOne({ email });
  if (userExisted) {
    return res.status(400).json("user already exist");
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
  if (user) {
    const { name, email, password, photo, bio, role, isVerified } = user;
    res.status(201).json({
      name,
      email,
      password,
      photo,
      bio,
      role,
      isVerified,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("Goal with this ID not found");
  }

  console.log("Request Body:", req.body); // Log request body to see what is coming in

  const updatedGoal = await User.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedGoal);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("can not find error");
  }
  const deletedUser = await User.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res.status(200).json(deletedUser);
});

module.exports = {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
};
