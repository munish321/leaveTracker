import User from "../models/users.js";
export const getAllUsers =async(req,res)=>{
  try {
    const users =await User.find();
   if(!users || users.length===0){
    return res.status(400).json({message:"No user found"})
   }
   return res.status(200).json({message:"User list fetch successfully",data:users})
  } catch (error) {
    return res.status(500).json({message:"Something went wrong, Please try again"})
  }
   
}