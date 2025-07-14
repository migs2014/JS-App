import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
 rollNumber: { 
    type: Number,
    required: [true, "Student Admission(Roll) number is required"],
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

const Teacher = new mongoose.model("Student", teacherSchema);
export default Student;
