import User from "../models/users.js";
import Leave from "../models/leave.js";
import Joi from "joi";


const LeaveSchema = Joi.object({
  leaveType : Joi.string().required().label("Leave Type"),
  fromDate : Joi.date().required().label("From Date"),
  toDate : Joi.string().required().label("To Date"),
  status : Joi.string().required().label("Status"),
  approverId : Joi.string().required().label("Approver id"),
  reason : Joi.string().required().label("Reason"),
  approverDate : Joi.date().optional().label("Approver Date"),
})

const isValid=(req,res)=>{
  const {
    fromDate,
    toDate
  }=req.body
   const from = new Date(fromDate);
   const to = new Date(toDate);
   if(from > to){
    res.status(400).json({message:"Start date should be less than end date"})
    return false
   }
   return true;
}
export const leaveRequest= async(req, res)=>{
  const {error} = LeaveSchema.validate(req.body)
  if(error){
    return res.status(400).json({message:error.details[0].message})
  }
  try {
    const { userId} = req.query;
    const user =await User.findById({_id:userId});
    if(!user) return res.status(400).json({message:"User not found"})

   if(isValid){
    const leave =await Leave.create({
      userId,
      ...req.body
    })
    res.status(201).json({message:"Leave created successfully"})
   }
  } catch (error) {
    console.log('error',error)
    return res.status(500).json({message:"Something went wrong"})
  }
 
}
export const getLeaveByApprover=async(req,res)=>{
    try {
      const {approverId} = req.params  
      const {firstName,fromDate,toDate,sortBy="createdAt", order="desc", page = 1, limit = 10 } = req.query
      const query = {approverId}

      if(fromDate && toDate){
        query.fromDate = { $gte: new Date(fromDate)}
        query.toDate = { $lt :new Date(toDate)}
      }

      if(firstName){
        query['userId.firstName'] = { $regex: firstName, $options: 'i' } // i means case insensitive
      }

      // for sorting based on the selected fields value.
       const sorting = { [sortBy]: order === 'asc' ? 1 : -1 }

       // pagination 
       const pageNumber = parseInt(page)
       const pageSize = parseInt(limit)
       const skip = (pageNumber - 1) * pageSize

      const leave = await Leave.find(query)
      .populate('userId',`firstName lastName email role phoneNumber address department`)
      .sort(sorting) // logic for storing 
      .skip(skip) // logic for pagination
      .limit(pageSize)
      
      const totalPages = await Leave.countDocuments(query)
      res.status(200).json({
        message:"Leave fetched successfully",
        data:leave,
        pagination:{
          page:pageNumber,
          limit:pageSize,
          total:totalPages
        }
      })
    } catch (error) {
      console.log('error',error)
      return res.status(500).json({message:"Something went wrong"})
    }
    
}

export const getCurrentUserLeaves=async(req,res)=>{
    try {
      const {userId} = req.params  
      const {firstName,fromDate,toDate,sortBy="createdAt", order="desc", page = 1, limit = 10 } = req.query
      const query = {userId}
      
      if(fromDate && toDate){
        query.fromDate = { $gte: new Date(fromDate)}
        query.toDate = { $lt :new Date(toDate)}
      }

      if(firstName){
        query['userId.firstName'] = { $regex: firstName, $options: 'i' } // i means case insensitive
      }

      // for sorting based on the selected fields value.
       const sorting = { [sortBy]: order === 'asc' ? 1 : -1 }

       // pagination 
       const pageNumber = parseInt(page)
       const pageSize = parseInt(limit)
       const skip = (pageNumber - 1) * pageSize

      const leaves = await Leave.find(query)
      .populate('userId',`firstName lastName email role phoneNumber address department`)
      .sort(sorting) // logic for storing 
      .skip(skip) // logic for pagination
      .limit(pageSize)
      
      const totalPages = await Leave.countDocuments(query)
      res.status(200).json({
        message:"Leave fetched successfully",
        data:leaves,
        pagination:{
          page:pageNumber,
          limit:pageSize,
          total:totalPages
        }
      })
    } catch (error) {
      console.log('error',error)
      return res.status(500).json({message:"Something went wrong"})
    }
}

//  Update leave usage after a leave is approved
export const updateLeaveBalance =async (req,res)=>{
     try {
      const {leaveId} = req.query
      const {fromDate,toDate} = req.body
      let parsedFromDate = new Date(fromDate)
      let parsedToDate = new Date(toDate)
      
      const leave = await Leave.findById({_id:leaveId})
      const user = await User.findById({_id:leave.userId})
      /*
       *  1 day = 1000*3600*24 = 86400000 ms
       * +1 is to include the first/start day 
      */ 
      const leavedays = parseInt(parsedToDate - parsedFromDate)/(1000*3600*24) +1 
    
      const isValid = (leaveType,LeaveValue)=>{
        let leaveBalance = user.leavesQuota[LeaveValue] - user.usedLeaves[LeaveValue]
        if(leaveBalance === 0){
          res.status(400).json({message:`${leaveType} leave quota exceeded`})
          return false;
        }
        if(user.leavesQuota[LeaveValue] < leavedays){
          res.status(400).json({message:`You can only take ${user.leavesQuota[LeaveValue]} ${LeaveValue} leaves.`})
          return false;
        }
        if(leaveBalance < leavedays){
          res.status(400).json({message:`Only ${leaveBalance} leave are left`})
          return false;
        }
      }
      let typeOfLeaves = ['Sick','Casual','Maternity']
     console.log('here we are')
      if(typeOfLeaves.includes(leave.leaveType)){
        if(isValid(leave.leaveType, leave.leaveType.toLocaleLowerCase())){
          user.usedLeaves[leave.leaveType.toLocaleLowerCase()] += leavedays
        }
      }
    
      // if(leave.leaveType === 'Sick'){
      //     if(isValid('Sick', 'sick')){
      //       user.usedLeaves.sick += leavedays
      //     }
      // }else if(leave.leaveType === 'Casual'){
      //   if(isValid('Casual', 'casual')){
      //     user.usedLeaves.casual += leavedays
      //   }
      // }else if(leave.leaveType === 'Maternity'){
      //   if( user.leavesQuota.maternity !== user.usedLeaves.maternity ){
      //     user.usedLeaves.maternity += leavedays  
      //   }else{
      //     return res.status(400).json({message:"Maternity leave quota exceeded"})
      //   }
      // }
      await user.save()
      res.status(200).json({message:"Leave updated successfully"})
     } catch (error) {
      console.log('error',error)
      return res.status(500).json({message:"Something went wrong"})
     }
}

export const remaingLeaves =async (req,res)=>{
  try {
    const {userId} = req.params

   if(userId === 'undefined' || userId === 'null'){
    return res.status(400).json({message:"userId is required"})
   } 

   const user =await User.findById({_id:userId})
   const remaingLeaves =[
    {
      name:'Sick',
      value:user.leavesQuota.sick - user.usedLeaves.sick
    },
    {
      name:'Casual',
      value:user.leavesQuota.casual - user.usedLeaves.casual
    },
    {
      name:'Maternity',
      value:user.leavesQuota.maternity - user.usedLeaves.maternity
    }
   ]
   res.status(200).json({remaingLeaves})
  } catch (error) {
    console.log('error',error)
    return res.status(500).json({message:"Something went wrong"})
  }
   
}