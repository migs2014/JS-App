import User from "../model/userModel.js";
export const createUserController = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, dateOfBirth, gender } =
      req.body;
    //validator
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!gender) {
      return res.send({ message: "Gender is Required" });
    }
    if (!role) {
      return res.send({ message: "Role is Required" });
    }
    if (!address) {
      return res.send({ message: "address is Required" });
    }
    if (!dateOfBirth) {
      return res.send({ message: "Date of Birth is Required" });
    }
    // Exiting user in database check her
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered, please login",
      });
    }
    const user = await new User({
        name,
        email,
        password,
        phone,
        gender,
        address,
        role,
        dateOfBirth,    
    }).save()
    // response here
    res.status(201).json({
        success: true,
        message: "User created Successfully",
        user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create User",
      error,
    });
  }
};
