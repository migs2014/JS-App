import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddleware";
//This for registered user
export const isAuthenticated = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.teacherToken ||
    req.cookies.studentToken;
  if (!token) {
    return next(new ErrorHandler("User Id not Authenticated", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next (new ErrorHandler("User not Found",404));
    }
  } catch (error) {
    return  next(new Error ("Invalid token",401));
  }
};

//this for student token
