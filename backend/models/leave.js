import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
  userId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true 
  },
  leaveType:{
    type:String,
    enum:['Sick','Casual','Maternity'],
    required:true
  },
  fromDate:{
    type:Date,
    required:true
  },
  toDate:{
    type:Date,
    required:true
  },
  reason:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:['Pending','Approved','Rejected'],
    default:'Pending'
  },
  approverId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  approveDate:{ type: Date }
}, { timestamps: true })

const leave = mongoose.model('leave',LeaveSchema)
export default leave;

