import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { createCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// Func to make user login
export const userLogin = async (req, res, next) => {
  try {
    // Take data from body
    const { email, password } = req.body;

    // First find the user from database using email
    let user = await User.findOne({ email }).select("+password");

    // If user is not present in database
    if (!user) return next(new ErrorHandler("Invalid email or password", 400));

    // If user exist then verify his password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password dosen't match throw error
    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 400));

    // If password is correct then create cookie and login with his name
    createCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// Func to register a new user
export const registerNewUser = async (req, res) => {
  try {
    // Take data from the body
    const { name, email, password } = req.body;

    // First find the user from database using email
    let user = await User.findOne({ email });

    // If user exist then send a message as already exists
    if (user) return next(new ErrorHandler("User already exists", 400));

    // If user not exist then first bcrypt his password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Now create the user in the database named "User"
    user = await User.create({ name, email, password: hashedPassword });

    // Call a func from utils folder to create cookie
    createCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

// Func to get details of a particular user
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// Func to logout the user
export const userLogout = (req, res) => {
  res
    .status(200)
    // Makes the cookie null from below line
    .cookie("Token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};
