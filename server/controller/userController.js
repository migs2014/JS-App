import User from "../model/userModel.js";
import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { jsontoken } from "../utils/token.js";
import cloudinary from "cloudinary";
// //  register user
// export const createUserController = errorHandleMiddleware(
//   async (req, res, next) => {
//     try {
//       // if (!req.files || Object.keys(req.files).length === 0) {
//       //   return next(new ErrorHandler("Image Required", 404));
//       // }
//       // const { avatar } = req.files;
//       // const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
//       // if (!allowedFormats.includes(avatar.mimetype)) {
//       //   return next(new ErrorHandler("File Format Not supported", 400));
//       // }
//       const {
//         name,
//         email,
//         password,
//         role,
//         phone,
//         address,
//         dateOfBirth,
//         gender,
//       } = req.body;

//       // Validator summarized
//       if (
//         !name ||
//         !email ||
//         !password ||
//         !role ||
//         !address ||
//         !phone ||
//         !dateOfBirth ||
//         !gender
//       ) {
//         return isNamedExportBindings(
//           new ErrorHandler("Fill all the fields", 400)
//         );
//       }
//       // Exiting user in database check here
//       const exitingUser = await User.findOne({ email });
//       if (exitingUser) {
//         return next(new ErrorHandler("This email Already Registered", 400));
//       }
//       // Cloudinary and image code base
//       const cloudinaryResponse = await cloudinary.uploader.upload(
//         avatar.tempfilepath
//       );
//       if (!cloudinaryResponse || cloudinaryResponse.error) {
//         console.log(
//           "Cloudinary Error",
//           cloudinaryResponse.error || "unknown cloudinary error"
//         );
//         return next(new ErrorHandler("Failed to load image to cloudinary", 404));
//       }
//       const user = await User.create({
//         name,
//         email,
//         password,
//         role,
//         phone,
//         gender,
//         address,
//         dateOfBirth,
//         avatar: {
//           public_id: cloudinaryResponse.public_id,
//           url: cloudinaryResponse.secure_url,
//         },
//       });

//       // response here
//        jsontoken (user, "User Created successfully",201, res);
//       res.status(200).json({
//         success: true,
//         message: "User created successfully",
//         data: user,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to create User",
//         error,
//       });
//     }
//   }
// );
// new code
export const createUserController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
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

      // Validate required fields
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
        return next(new ErrorHandler("Fill all the fields", 400));
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ErrorHandler("This email is already registered", 400));
      }

      let avatarData = undefined;

      // Process avatar if provided
      if (req.files && req.files.avatar) {
        const { avatar } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

        if (!allowedFormats.includes(avatar.mimetype)) {
          return next(new ErrorHandler("File format not supported", 400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
          avatar.tempFilePath
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
          );
          return next(
            new ErrorHandler("Failed to upload image to Cloudinary", 500)
          );
        }

        avatarData = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
      }

      // Create the user
      const user = await User.create({
        name,
        email,
        password,
        role,
        phone,
        gender,
        address,
        dateOfBirth,
        avatar: avatarData,
      });

      // jsontoken(user, "User created successfully", 201, res);

      // res.status(200).json({
      //   success: true,
      //   message: "User created successfully",
      //   data: user,
      // });
      // const token = jsontoken(user, "User Created successfully", 201); // res removed
      jsontoken(user, "User Created successfully", 201, res);
      // res.status(201).json({
      //   success: true,
      //   message: "User created successfully",
      //   token,
      //   data: user,
      // });
    } catch (error) {
      console.log("User creation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create User",
        error: error.message || "Unexpected error occurred",
      });
    }
  }
);
// login user
export const logInUseController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
        return next(new ErrorHandler("Please Fill full form", 400));
      }
      // Check if user is in database
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
      }
      // Add debug logs here 📋
      console.log("Submitted role:", role);
      console.log("User role:", user.role);

      // Check Password in database and user password
      const passwordMatch = await user.comparePassword(password);
      // More debug logs
      console.log("Password matched?", passwordMatch);

      if (!passwordMatch) {
        return next(new ErrorHandler("Invalid Email or password", 403));
      }
      // Role check in database and user role
      if (role !== user.role) {
        return next(
          new ErrorHandler(
            "This email does not match the selected role, Please choose correct role and try again",
            404
          )
        );
      }
      // if password and role are correct , send a request
      jsontoken(user, "User Login Successfully", 200, res);
    } catch (error) {
      console.error("Login error:", error); // full error log for debugging

      res.status(500).json({
        success: false,
        message: "Error in Login Controller",
        error: error.message || "Unexpected error occurred",
      });
    }
  }
);
// Admin register
export const createAdminController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
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

      // Validate required fields
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
        return next(new ErrorHandler("Fill all the fields", 400));
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ErrorHandler("This email is already registered", 400));
      }

      let avatarData = undefined;

      // Process avatar if provided
      if (req.files && req.files.avatar) {
        const { avatar } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

        if (!allowedFormats.includes(avatar.mimetype)) {
          return next(new ErrorHandler("File format not supported", 400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
          avatar.tempFilePath
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.log(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
          );
          return next(
            new ErrorHandler("Failed to upload image to Cloudinary", 500)
          );
        }

        avatarData = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
      }

      // Create the user
      const user = await User.create({
        name,
        email,
        password,
        role: "Admin",
        phone,
        gender,
        address,
        dateOfBirth,
        avatar: avatarData,
      });

      // jsontoken(user, "User created successfully", 201, res);

      // res.status(200).json({
      //   success: true,
      //   message: "User created successfully",
      //   data: user,
      // });
      const token = jsontoken(user, "User Created successfully", 201, res); // res removed
      res.status(201).json({
        success: true,
        message: "User created successfully",
        token,
        data: user,
      });
    } catch (error) {
      console.log("User creation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create User",
        error: error.message || "Unexpected error occurred",
      });
    }
  }
);
// get single admin by Id
export const getSingleAdmin = errorHandleMiddleware(async (req, res, next) => {
  try {
    const admin = await User.findById(req.params.id);
    if (!admin) {
      return next(new ErrorHandler("Admin not found", 404));
    }
    //  if admin is found then respond
    res.status(200).json({
      success: true,
      message: "Admin Found Successfully",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Single admin",
      error,
    });
  }
});
// logout admin
export const logOutAdmin = errorHandleMiddleware(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .send({
      success: true,
      message: "Admin Logges Out successfully",
    });
});
// get admin profile
export const getAdminProfile = errorHandleMiddleware(async (req, res, next) => {
  try {
    const admin = await User.findById(req.user.id);
    if (!admin || admin.role !== "Admin") {
      return next(new ErrorHandler("Admin Not Found or Unauthorize", 404));
    }
    //if admin is found then respond
    res.status(200).json({
      success: true,
      message: "Admin Profile found Successfully",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Admin profile",
      error,
    });
  }
});
// Get current user
export const getCurrentUser = errorHandleMiddleware(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to get user information"));
  }
});
// Get all users
export const getAllUsers = errorHandleMiddleware(async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
      return next(new ErrorHandler("User Not Foun"), 404);
    }
    // Send response upon find all the users
    res.status(200).json({
      success: true,
      message: "All User Fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching All users",
      error,
    });
  }
});
