import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    minLength: [3, "Name must be at least 3 Characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [6, "Password must be at least  Characters long"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "User Role is required"],
    enum: ["Admin", "Student", "Teacher"],
  },
  avatar: {
    public_id: { type: String },
    url: { type: String },
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"],
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["Male", "Female"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
});

//Hash password
// userSchema.pre("save", async function (next) {
//     if(!this.isModified("password")) {
//         return next();
//     }
// });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10); // You can adjust the salt rounds
  next();
});

// compare password , user password and database password  //method to methods
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
//json web token generation

userSchema.methods.generateJsonWebToken = function () {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET – cannot sign tokens");
  }
  
  // Fallback to "7d" if you didn’t set JWT_EXPIRES
  const expiresIn = process.env.JWT_EXPIRES || "7d";

  return jwt.sign(
    { id: this._id, role: this.role },
    secret,
    { expiresIn }           // <- must be 'expiresIn', not 'expires'
  );
};


// userSchema.methods.generateJsonWebToken = function () {
//  return jwt.sign({
//     id: this._id,
//     role: this.role, //this role for user and help for middleware
//  },
// process.env.JWT_SECRET_KEY,{
//     expiresIn:process.env.JWT_EXPIRES
// });
// };

const User = mongoose.model("User", userSchema);
export default User;
