import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";

// Code for registering a user to the database
export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400);
    return res.json({ message: "Please add all required fields" });
  }

  // Check if user exists through the email address
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return res.json({ message: "User already exists" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// Code for logging user in
export const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Check for user email
  const user =
    (await User.findOne({ email })) || (await User.findOne({ username }));

  // comparing the password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// code for getting user details
export const getUser = asyncHandler(async (req, res) => {
  const { _id, name, username, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    username,
    email,
  });
});

//code for generating token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
