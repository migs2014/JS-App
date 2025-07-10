import User from "../model/userModel.js";
import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { jsontoken } from "../utils/token.js";
import cloudinary from "cloudinary";
export const createUserController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Image Required", 404));
      }
      const { avatar } = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(avatar.mimetype)) {
        return next(new ErrorHandler("File Format Not supported", 400));
      }
      const {
        name,
        email,
        password,
        role,
        phone,
        address,
        dateOfBirth,
        gender,
      } = req.body;
      // Validator summarized
      if (
        !name ||
        !email ||
        !password ||
        !role ||
        !address ||
        !phone ||
        !dateOfBirth ||
        !gender
      ) {
        return isNamedExportBindings(
          new ErrorHandler("Fill all the fields", 400)
        );
      }
      // Exiting user in database check here
      const exitingUser = await User.findOne({ email });
      if (exitingUser) {
        return next(new ErrorHandler("This email Already Registered", 400));
      }
      // Cloudinary nad image code base
      const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempfilepath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log(
          "Cloudinary Error",
          cloudinaryResponse.error || "unknown cloudinary error"
        );
        return next (new ErrorHandler("Failed to image to cloudinary",404))
      }
      const user = await User.create({
        name,
        email,
        password,
        role,
        phone,
        gender,
        address,
        dateOfBirth,
        avatar: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url
        }
      });

      // response here
      //  jsontoken (user, "User Created successfully",201, res);
      res.status(200).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to create User",
        error,
      });
    }
  }
);
