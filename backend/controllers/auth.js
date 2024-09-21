import jwt from 'jsonwebtoken';
import User from '../models/users.js';
export const auth = async(req,res) => {
  const token = req.params.id
  if(token){
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
        res.status(200).json({auth:true,message:"user is authenticated",data:decoded})
    } catch (error) {
       res.status(400).json({auth:false,measage:error.measage})
    } 
  }else{
    res.status(400).json({auth:false,measage:"Invalid token"})
  }
}

export const loggedInUser = async (req,res) => {
   if(req.user===null && req.user===undefined){ 
    return res.status(400).json({message:"user is not authenticated"})
   }
   const user = await User.find({_id:req.user._id})
   return res.status(200).json({message:"user is authenticated",data:user[0]})
}

export const updateUser = async (req,res) => {
  if(!req.user){
    return res.status(400).json({message:"user is not authenticated"})
  }
  const user = await User.findByIdAndUpdate({_id:req.user._id},{...req.body},{new:true, runValidators: true})
  if(user){
    return res.status(200).json({message:"user updated successfully",data:user})
  }else{
    return res.status(400).json({message:"user not found"})
  }
}