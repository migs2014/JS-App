import User from "../model/userModel.js";
import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { jsontoken} from "../utils/token.js";

export const createUserController = errorHandleMiddleware(async (req, res, next) => {
  try {
    const { name, email, password, role, phone, address, dateOfBirth, gender } =
      req.body;
    // Validator summarized
    if (!name || !email || !password || !role || !address || !phone || !dateOfBirth || !gender){
      return isNamedExportBindings(new ErrorHandler("Fill all the fields",400))
    };
   // Exiting user in database check here
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return next (new ErrorHandler("This email Already Registered",400));
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
    }); 

    // response here
  //  jsontoken (user, "User Created successfully",201, res);
  res.status(200).json({
  success: true,
  message: "User created successfully",
  data: user
});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create User",
      error,
    });
  }
});
