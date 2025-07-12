import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  subject: {
    type: String,
    required: [true, "Teacher Subject is required"],
  },
  department: {
    type: String,
    required: [true, "Department is Required"],
  },
  hireDate: {
    type: String,
    required: [true, "Teacher Report/Hired Date is required"],
  },
  qualification: {
    type: String,
    required: [true, "Teacher Qualification is required"],
  },
});

const Teacher = new mongoose.model("Teacher", teacherSchema);
export default Teacher;
