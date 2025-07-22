
// export const jsontoken = (user, message, statusCode, res) => {
//   if (!res) {
//     throw new Error("Response object (res) is required");
//   }
// // Generate JWT
//   const token = user.generateJsonWebToken();
//   const nameMap = {
//     Admin:   "adminToken",
//     Teacher: "teacherToken",
//     Student: "studentToken"
//   };
//     const cookieName = nameMap[user.role];
//   if (!cookieName) {
//     throw new Error("Invalid User Role");
//   }
//   // Set cookie options
//   const days = parseInt(process.env.COOKIE_EXPIRE, 10) || 7;

//   const cookieOptions = {
//     expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
//     // sameSite: "None",
//   };
//   return res
//     .status(statusCode)
//     .cookie(cookieName, token, cookieOptions)
//     .json({
//       success: true,
//       message,
//       user,
//       token
//     });
// };

export const jsontoken = (user, message, statusCode, res) => {
  if (!res) throw new Error("Response object is required");

  const token = user.generateJsonWebToken();

  const cookieName = {
    Admin:   "adminToken",
    Teacher: "teacherToken",
    Student: "studentToken"
  }[user.role];

  if (!cookieName) throw new Error("Invalid User Role");

  const days = parseInt(process.env.COOKIE_EXPIRE, 10) || 7;
  const cookieOptions = {
    expires:  new Date(Date.now() + days * 24*60*60*1000),
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
    // domain: process.env.COOKIE_DOMAIN  (if cross‐subdomain needed)
  };

  return res
    .status(statusCode)
    .cookie(cookieName, token, cookieOptions)
    .json({
      success: true,
      message,
      user
    });
};