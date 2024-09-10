import jwd from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/users.js';

export const login = async (req, res) => {
  const {email,password} = req.body;
  const user = await User.findOne({email}).exec();
  if(user){
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid){
       const token = jwd.sign({email:user.email,_id:user._id,name:user.name,role:user.role,imageUrl:user.imageUrl},process.env.JWT_SECRET,{expiresIn:"1d"});
       res.status(201).json({message:"Login Successfull",token:token,data:{email:user.email,_id:user._id,name:user.name,role:user.role}})
    }else{
      res.status(400).json({message:"Invalid credentials"})
      return false
    }
  }else{
    res.status(400).json({message:"User does not exist please signup"})
    return false;
  }
}