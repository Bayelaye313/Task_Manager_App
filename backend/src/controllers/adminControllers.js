const userModels = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModels.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("can not find this user");
  }

  res.status(200).json({
    message: "User deleted successfully",
    deletedUser: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userModels.find();

  if (!users || users.length === 0) {
    res.status(404);
    throw new Error("No users found");
  }

  res.status(200).json({
    message: "Users retrieved successfully",
    users,
  });
});
module.exports = { deleteUser, getAllUsers };
