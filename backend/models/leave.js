import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
  leaveId:{
    type:mongoose.Schema.Types.ObjectId,
  },
  employeeId:{
    type:String,
    required:[true,"Employee Id is required"],
  },
  leaveType:{
    type:String,
    required:[true,"Leave Type is required"],
  },
  startDate:{
    type:Date,
    required:[true,"Start Date is required"],
  },
  endDate:{
    type:Date,
    required:[true,"End Date is required"],
  },
  duration:{
    type:String,
    required:[true,"Duration is required"],
  },
  reason:{
    type:String,
    maxLength:[120,"Reason cannot be greater then 120 characters"],
  },
  status:{
    type:String,
    required:[true,"Status is required field"],
  },
  approverId:{
    type:String,
    default:null,
  },
  applicationDate:{
    type:Date,
    required:[true,"Application Date is required."],
  },
  attachment:{
    type:String,
  },
  approvalDate:{
    type:Date,
    default:null
  },
})

const leave = mongoose.model('leave',LeaveSchema)
export default leave;

