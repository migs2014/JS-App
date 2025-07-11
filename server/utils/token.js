// export const jsontoken = (user, message, statusCode, res) => {
//   const token = user.generateJsonWebToken();
//   let cookieName;
//   switch (user.role) {
//     case "Admin":
//       cookieName = "adminToken";
//       break;
//     case "Teacher":
//       cookieName = "teacherToken";
//       break;
//     case "Student":
//       cookieName = "studentToken";
//       break;
//     default:
//       throw new Error("Invalid User Role");
//   }
//   res.status(statusCode).cookie(cookieName),
//     token,
//     {
//       expires: new Date(
//         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//     }.json({
//       success: true,
//       message,
//       user,
//       token,
//     });
// };

// export const jsontoken = (user, message, statusCode, res) => {
//   const token = user.generateJsonWebToken();
//   let cookieName;

//   switch (user.role) {
//     case "Admin":
//       cookieName = "adminToken";
//       break;
//     case "Teacher":
//       cookieName = "teacherToken";
//       break;
//     case "Student":
//       cookieName = "studentToken";
//       break;
//     default:
//       throw new Error("Invalid User Role");
//   }

//   res
//     .status(statusCode)
//     .cookie(cookieName, token, {
//       expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
//       httpOnly: true,
//     })
//     .json({
//       success: true,
//       message,
//       user,
//       token,
//     });
// };
export const jsontoken = (user, message, statusCode, res) => {
  if (!res) {
    throw new Error("Response object (res) is required");
  }

  const token = user.generateJsonWebToken();

  // Validate user role
  const validRoles = ["Admin", "Teacher", "Student"];
  if (!validRoles.includes(user.role)) {
    throw new Error("Invalid User Role");
  }

  // Assign cookie name based on role
  let cookieName;
  switch (user.role) {
    case "Admin":
      cookieName = "adminToken";
      break;
    case "Teacher":
      cookieName = "teacherToken";
      break;
    case "Student":
      cookieName = "studentToken";
      break;
  }

  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  // Send response with cookie and JSON payload
  res
    .status(statusCode)
    .cookie(cookieName, token, cookieOptions)
    .json({
      success: true,
      message,
      user,
      token,
    });
};
