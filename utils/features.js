import jwt from "jsonwebtoken";

export const createCookie = (user, res, message, statusCode = 200) => {
  // Take user's id from mongodb and create a token to store in browser cookie
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // Create a cookie with name and value as above token
  res
    .status(statusCode)
    .cookie("Token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
