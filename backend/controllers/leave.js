import User from "../models/users.js";
import Leave from "../models/leave.js";
const isValid=(req,res)=>{
  const {
     leaveType,
    fromDate,
    toDate,
    status,
    approverId,
  }=req.body
   if(leaveType.trim().length === 0){
    res.status(400).json({message:"Please Select the leave type"})
    return false;
   }
   const from = new Date(fromDate);
   const to = new Date(toDate);
   if(isNaN(from.getTime()) || isNaN(to.getTime())){
    res.status(400).json({message:"Please enter valid date"})
    return false
   }
   if(from > to){
    res.status(400).json({message:"From date should be less than to date"})
    return false
   }
   if(status.trim().length === 0){
    res.status(400).json({message:"Please Select the status"})
    return false
   }
   if(approverId.trim().length === 0){
    res.status(400).json({message:"Please Select the approver"})
    return false
   }
   return true;
}
export const leaveRequest= async(req, res)=>{
  try {
    const { userId} = req.params;
    const user = User.findById(userId);
    if(!user) return res.status(400).json({message:"User not found"})

   if(isValid){
    const leave =await Leave.create({
      userId,
      ...req.body
    })
    user.leaves.push(leave._id)
    await user.save()
    res.status(201).json({message:"Leave created successfully"})
   }
  } catch (error) {
    return res.status(500).json({message:"Something went wrong, Please try again"})
  }
 
}