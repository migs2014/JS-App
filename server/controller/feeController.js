import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Fee from "../model/feeModel.js";
import Student from "../model/studentModel.js";
// create fee
export const createFeeController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { studentId, amount, paymentDate, dueDate } = req.body;
      if (!studentId || !amount || !paymentDate || !dueDate) {
        return next(
          new ErrorHandler(
            "Please provide Student Details, amount, due Date and Payment Date",
            400
          )
        );
      }
      // Check student is in database
      const student = await Student.findById(studentId);
      if (!student) {
        return next(new ErrorHandler("Student Not Found in Database", 400));
      }
      //create Fee
      const fee = await Fee.create({
        studentId,
        amount,
        dueDate: new Date(dueDate),
        status: "Unpaid",
        paymentDate: new Date(paymentDate),
      });
      const populateFee = await Fee.findById(fee._id).populate("studentId");
      // response here
      res.status(201).json({
        success: true,
        message: "Fee Created Successfully",
        populateFee,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Creating fee Controller",
        error,
      });
    }
  }
);
// get all fees paid
export const getAllFeeController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { status, studentId, dueBefore } = req.query;
      let query = {};
      if (status) query.status = status;
      if (studentId) query.studentId = studentId;
      if (dueBefore) query.dueBefore = dueBefore;
      const fees = await Fee.find(query)
        .populate("studentId", "name rollNumber classId")
        .sort("dueDate");

      // response
      res.status(200).json({
        success: true,
        message: "Fee retrieved successfully",
        fees,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Creating All Fee Controller",
        error,
      });
    }
  }
);
//  get single fee by Id
export const getSingleFeeController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const fee = await Fee.findById(req.params.id).populate("studentId");
      if (!fee) {
        return next(new ErrorHandler("Fee record not Found", 400));
      }
      // response here
      res.status(200).json({
        success: true,
        message: "Single Fee Fetched successfully",
        fee,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Creating single Fee Controller",
        error,
      });
    }
  }
);

// update fee by Id
export const updateFeeController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { classId, amount, dueDate, status } = req.body;
    //   if(!classId || !amount ||!dueDate||!status) {
    //     return next(new ErrorHandler("Please Provide all fields",400));
    //   }
      const updatedFee = await Fee.findByIdAndUpdate(
        id,
        {
          classId,
          amount,
          dueDate,
          status,
        },
        { new: true }
      );
    //   response here
    res.status(200).json({
        success:true,
        message: "Fee updated Successfully",
        updatedFee,
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Update Fee controller",
        error,
      });
    }
  }
);
// delete fee by Id
export const deleteFeeController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
        const fee = await Fee.findById(req.params.id)
        if(!fee){
            return next(new ErrorHandler("Fee Not Found",404))
        }
        if(fee.status ==="Paid") {
            return next(new ErrorHandler("Cannot Delete paid Fee records",400));
        }
        await fee.deleteOne()
        // response
        res.status(200).json({
            success:true,
            message:"Fee Record Deleted successfully",
        })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Delete Fee controller",
        error,
      });
    }
  }
);
