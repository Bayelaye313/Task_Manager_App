const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const User = require("../models/userModels");
const generateTokens = require("../helpers/generateTokens");

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
  // const hashedPassword = await bcrypt.hash(password, 10);

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
    const token = generateTokens(user._id);

    // Ajout du cookie sécurisé
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
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

// user login
const loginUser = asyncHandler(async (req, res) => {
  // get email and password from req.body
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    // 400 Bad Request
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res.status(404).json({ message: "User not found, sign up!" });
  }

  // check id the password match the hashed password in the database
  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) {
    // 400 Bad Request
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // generate token with user id
  const token = generateTokens(userExists._id);

  if (userExists && isMatch) {
    const { _id, name, email, role, photo, bio, isVerified } = userExists;

    // set the token in the cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "none", // cross-site access --> allow all third-party cookies
      secure: true,
    });

    // send back the user and token in the response to the client
    res.status(200).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "user logged out" });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("user with this ID not found");
  } else {
    const { name, bio, photo } = req.body;
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.photo = photo || user.photo;

    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated successfully",
      updatedUser: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        bio: updatedUser.bio,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
      },
    });
  }
});

// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(400);
//     throw new Error("can not find error");
//   }
//   const deletedUser = await User.findByIdAndDelete(req.params.id, {
//     new: true,
//   });
//   res.status(200).json(deletedUser);
// });

module.exports = {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
};
