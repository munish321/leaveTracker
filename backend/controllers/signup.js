import bcrypt from 'bcrypt'
import User from "../models/users.js";
import validator from "validator";


const superSalt = 10;
const validateSignUp =async(req,res)=>{
  const {name,email,password} = req.body
  if(!name || !email || !password){
    res.status(400).json({message:"All fields are required"})
    return false
  }
  if(name.trim().length === 0 ){
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
  const { name,email, password,role } = req.body
  try {
  const isValid =await validateSignUp(req,res)
  if(isValid){
    const salt = await bcrypt.genSalt(superSalt)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser =await User.create({name,email,password: hashedPassword,role:role?role:'USER'})
    res.status(201).json({
       message:"Account created successfully",
      })
    }
  }catch (error) {
    res.status(400).json({message:"Something went wrong, please try again"})
 }
}
export default signup;