import mongoose from "mongoose";
const feeSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Paid","Unpaid"]
    },
    paymentDate: Date,
});
const Fee=mongoose.model("Fee",feeSchema);
export default Fee;