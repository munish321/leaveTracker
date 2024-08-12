import bcrypt from 'bcrypt'
import User from "../models/users.js";
import validator from "validator";


const superSalt = 10;
const validateSignUp =async(req,res)=>{
  const {name,email,password} = req.body
  console.log(name,email,password)
  if(name.trim().length === 0){
    res.status(400).json({message:"Please enter a name"})
    return false;
  }
  if(!validator.isEmail(email)){
    res.status(400).json({message:"Please enter a valid email"})
    return false;
  }
  if(password.trim().length === 0){
    res.status(400).json({message:"Please enter a password"})
    return false;
  }else if(password.trim().length < 8){
      res.status(400).json({message:"Password should be atleast 8 characters"})
      return false;
  }
  const emailExists = await User.findOne({email})
  if(emailExists){
    res.status(400).json({message:"Email already exists"})
    return false
  }
  return true
}
 const signup = async (req, res) => {
  const { name,email, password } = req.body
  const isValid =await validateSignUp(req,res)
  if(isValid){
    try {
    const salt = await bcrypt.genSalt(superSalt)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser =await User.create({name,email,password: hashedPassword,role:'USER'})
    res.status(201).json({
       message:"Account created successfully",
      })
    } catch (error) {
       res.status(400).json({message:error})
    }
    
  }
}
export default signup;