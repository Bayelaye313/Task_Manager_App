const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const User = require("../models/userModels");
const generateTokens = require("../helpers/generateTokens");

const getUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, photo, bio, role, isVerified } = req.body;
  // Vérification des champs requis
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
  const userExisted = await User.findOne({ email });
  if (userExisted) {
    res.status(400);
    throw new Error("user already exist");
  }

  // Cryptage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    photo,
    bio,
    role,
    isVerified,
  });
  if (user) {
    const token = generateTokens(user._id);

    // Ajout du cookie sécurisé
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
        token,
      },
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
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
