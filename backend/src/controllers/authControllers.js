const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/userModels");
const generateTokens = require("../helpers/generateTokens");
const { JsonWebTokenError } = require("jsonwebtoken");
const Token = require("../models/tokenModels");
const sendEmail = require("../helpers/sendEmail");
const hashToken = require("../helpers/hashToken");

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//register User
const registerUser = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
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
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
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
  const isProduction = process.env.NODE_ENV === "production";

  if (userExists && isMatch) {
    const { _id, name, email, role, photo, bio, isVerified } = userExists;

    // set the token in the cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
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

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });

  res.status(200).json({ message: "User logged out" });
});

//update user
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

//user login-status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(404).json({ message: "not authorized please login" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    res.status(200).json(true);
  } else {
    res.status(401).json(false);
  }
});

//user email verification
const verifyEmail = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
    const verificationToken = crypto.randomBytes(64).toString("hex") + user._id;
    const hashedToken = hashToken(verificationToken);
    await new Token({
      userId: user._id,
      verificationToken: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    }).save();
    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    await sendEmail(
      "Email Verification - AuthKit",
      user.email,
      process.env.USER_EMAIL,
      "noreply@gmail.com",
      "emailVerification",
      user.name,
      verificationLink
    );
    return res.json({ message: "Email sent" });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res
      .status(500)
      .json({ message: "An error occurred while verifying email" });
  }
});

// verify user
const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid verification token" });
  }
  // hash the verification token --> because it was hashed before saving
  const hashedToken = hashToken(verificationToken);

  // find user with the verification token
  const userToken = await Token.findOne({
    verificationToken: hashedToken,
    // check if the token has not expired
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res
      .status(400)
      .json({ message: "Invalid or expired verification token" });
  }

  //find user with the user id in the token
  const user = await User.findById(userToken.userId);

  if (user.isVerified) {
    // 400 Bad Request
    return res.status(400).json({ message: "User is already verified" });
  }

  // update user to verified
  user.isVerified = true;
  await user.save();
  res.status(200).json({ message: "User verified" });
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    // 404 Not Found
    return res.status(404).json({ message: "User not found" });
  }

  // see if reset token exists
  let token = await Token.findOne({ userId: user._id });

  // if token exists --> delete the token
  if (token) {
    await token.deleteOne();
  }

  // create a reset token using the user id ---> expires in 1 hour
  const passwordResetToken = crypto.randomBytes(64).toString("hex") + user._id;

  // hash the reset token
  const hashedToken = hashToken(passwordResetToken);

  await new Token({
    userId: user._id,
    passwordResetToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
  }).save();

  // reset link
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${passwordResetToken}`;

  // send email to user
  const subject = "Password Reset - AuthKit";
  const send_to = user.email;
  const send_from = process.env.USER_EMAIL;
  const reply_to = "noreply@noreply.com";
  const template = "forgotPassword";
  const name = user.name;
  const url = resetLink;

  try {
    await sendEmail(subject, send_to, send_from, reply_to, template, name, url);
    res.json({ message: "Email sent" });
  } catch (error) {
    console.log("Error sending email: ", error);
    return res.status(500).json({ message: "Email could not be sent" });
  }
});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetPasswordToken } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  // hash the reset token
  const hashedToken = hashToken(resetPasswordToken);

  // check if token exists and has not expired
  const userToken = await Token.findOne({
    passwordResetToken: hashedToken,
    // check if the token has not expired
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }

  // find user with the user id in the token
  const user = await User.findById(userToken.userId);

  // update user password
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
});

//change password
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid current password!" });
  }

  // const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    message: "Password changed successfully",
  });
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
  loginStatus,
  verifyEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
};
