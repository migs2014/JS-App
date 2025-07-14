import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Attendance from "../model/attendanceModel.js";
import Student from "../model/studentModel.js";
// create Attendance
export const createAttendanceController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { studentId, classId, date, status } = req.body;
      if (!studentId || !classId || !date || !status) {
        return next(new ErrorHandler("Please Provide all the fields", 400));
      }
      //  check if student exists
      const student = await Student.findById(studentId);
      if (!student) {
        return next(new ErrorHandler("Student Not Found", 400));
      }
      // check if attendance already has been recorded for this student on this date
      const existingAttendance = await Attendance.findOne({
        studentId,
        date: new Date(date),
      });

      if (existingAttendance) {
        return next(new ErrorHandler("Attendance for this date recorded", 400));
      }
      // create the attendance
      const attendance = await Attendance.create({
        studentId,
        classId,
        date: new Date(date),
        status,
      });
      const populateAttendance = await Attendance.findById(attendance._id)
        .populate("studentId", "name rollNumber")
        .populate("classId", "name");
      // response here
      res.status(201).json({
        success: true,
        message: "Attendance Created successfully",
        populateAttendance,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Creating Attendance Controller",
      });
    }
  }
);
// get all attendance
export const getAllAttendanceController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const attendance = await Attendance.find()
        .populate({
          path: "studentId",
          populate: {
            path: "userId",
            select: "name",
          },
        })
        .populate("classId", "name");
      if (attendance.length === 0) {
        return next(
          new ErrorHandler("Attendance can't be Found, Try again", 404)
        );
      }
      //  response here
      res.status(200).json({
        success: true,
        message: "Attendance Fetched Successfully",
        attendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in Getting All Attendance Controller",
      });
    }
  }
);
// get single attendance
export const getSingleAttendanceController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const attendance = await Attendance.findById(id)
        .populate("studentId")
        .populate("classId");
      if (!attendance) {
        return next(new errorHandleMiddleware("Record not Found", 404));
      }
      // response here
      res.status(200).json({
        success: true,
        msessage: "Attendance fetched Successfully",
        attendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in Getting All Attendance Controller",
      });
    }
  }
);
// Update attendance
export const updateAttendanceController =errorHandleMiddleware(async(req,res,next)=>{
try {
    const { id } =req.params;
    const {studentId,classId,date,status}=req.body;
    // check if attendance record exists
    const attendanceRecord =await Attendance.findById(id);
    if(!attendanceRecord){
        return next(new ErrorHandler("Attendance record not Found",404));
    }
    if(studentId && studentId !== attendanceRecord.studentId.toString()){
       const student=await Student.findById(studentId) 
       if(!student){
        return next(new ErrorHandler("Student Not Found",404))
       }
    }
    if(classId && classId !==attendanceRecord.classId.toString()){
        const classExists=await Class.findById(classId)
        if(!classExists){
            return next(new ErrorHandler("Class Not Found",404))
        }
    }
    // update Fields (in future consider saving and updating the same time)
    attendanceRecord.studentId = studentId ||attendanceRecord.studentId;
    attendanceRecord.classId = classId ||attendanceRecord.classId;
    attendanceRecord.date = date ? new Date(date) : attendanceRecord.date;
    attendanceRecord.status = status ||attendanceRecord.status;
    // save the record
    const savedAttendanceRecord=await attendanceRecord.save();
    const updateAttendance=await Attendance.findById(savedAttendanceRecord._id)
    .populate("studentId","userId name")
    .populate("classId","name");
    // response here
    res.status(200).json({
        success:true,
        message:"Attendance Updated Successfully",
        savedAttendanceRecord,
    })
} catch (error) {
     res.status(500).json({
        success: false,
        message: "Error in Updating singleAttendance Controller",
      });
}
});
// Delete attendance
export const deleteAttendanceController=errorHandleMiddleware(async(req,res,next)=>{
    try {
        const { id }=req.params;
        const deleted=await Attendance.findByIdAndUpdate(id)
        if(!deleted) {
           return next(new ErrorHandler("Record not Found",404)) 
        }
        // response here
        res.status(200).json({
            success:true,
            message:"Attendance deleted Successfully",
        })
    } catch (error) {
       res.status(500).json({
        success: false,
        message: "Something Went Wrong",
        error: error.message,
       }) 
    }
})


// Future cleaner code for updating and saving:
// export const updateAttendanceController = errorHandleMiddleware(async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { studentId, classId, date, status } = req.body;

//     const attendanceRecord = await Attendance.findById(id);
//     if (!attendanceRecord) {
//       return next(new ErrorHandler("Attendance record not found", 404));
//     }

//     // Check and validate updated student ID
//     if (studentId && studentId !== attendanceRecord.studentId.toString()) {
//       const studentExists = await Student.findById(studentId);
//       if (!studentExists) {
//         return next(new ErrorHandler("Student not found", 404));
//       }
//       attendanceRecord.studentId = studentId;
//     }

//     // Check and validate updated class ID
// //     if (classId && classId !== attendanceRecord.classId.toString()) {
//       const classExists = await Class.findById(classId);
//       if (!classExists) {
//         return next(new ErrorHandler("Class not found", 404));
//       }
//       attendanceRecord.classId = classId;
//     }

//     // Update other fields if provided
//     if (date) attendanceRecord.date = new Date(date);
//     if (status) attendanceRecord.status = status;

//     // Save updated attendance
//     await attendanceRecord.save();

//     // Populate for response
//     const updatedAttendance = await Attendance.findById(id)
//       .populate("studentId", "userId name")
//       .populate("classId", "name");

//     res.status(200).json({
//       success: true,
//       message: "Attendance updated successfully",
//       updatedAttendance,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error in Updating singleAttendance Controller",
//     });
//   }
// });

