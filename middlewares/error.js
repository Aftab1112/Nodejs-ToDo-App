// Custom error class to show custom err msg and status code for diff errors
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// This func will be called in "next()" in task.js controllers
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;
  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message });
};

export default ErrorHandler;
