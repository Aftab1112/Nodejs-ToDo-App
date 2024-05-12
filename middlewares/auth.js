import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  // First take Token from cookie if the user is logged in
  const { Token } = req.cookies;

  // If user is not logged in send this error msg
  if (!Token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  // If user is logged in then decode the Token and access the id from it
  const decodedToken = jwt.verify(Token, process.env.JWT_SECRET);

  // Now from above id find the user from database and show him in response
  req.user = await User.findById(decodedToken._id);
  next();
};
