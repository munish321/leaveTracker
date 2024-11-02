import bcrypt from 'bcrypt'
import User from "../models/users.js";
import Joi from 'joi';


const superSalt = 10;
const signUpSchema = Joi.object({
  firstName:Joi.string().required().label("First Name"),
  lastName:Joi.string().required().label('Last Name'),
  email:Joi.string().email().required().label('E-Mail'),
  password:Joi.string().max(8).required().label('Password'),
  role:Joi.string().optional(),
  dateOfJoining:Joi.date().iso().required().label('Date Of Joining'),
  department:Joi.string().required().label('Department'),
  address:Joi.string().required().label('Address'),
  phoneNumber:Joi.string().max(10).optional().label('Phone Number'),
  salary:Joi.string().required('Salary').label('Salary'),
}).messages({
  'any.required': '{#label} is required',
  'string.email': '{#label} must be a valid email address',
  'string.min': '{#label} should have at least {#limit} characters',
  'string.max': '{#label} should have at most {#limit} characters',
  'date.base': '{#label} must be a valid date',
  'number.base': '{#label} must be a valid number',
});
const validateSignUp =async(req,res)=>{
  const {email} = req.body
  const {error} = signUpSchema.validate(req.body)
  if(error){
    res.status(400).json({message:error.details[0].message})
    return false
  }
  const emailExists = await User.findOne({email})
  if(emailExists){
    res.status(400).json({message:"Email already exists"})
    return false
  }
  return true
}
 const signup = async (req, res) => {
  const { 
    firstName,
    email,
    password,
    role,
    dateOfJoining,
    department,
    address,
    phoneNumber,
    salary,
    lastName
  } = req.body
  try {
  const isValid =await validateSignUp(req,res)
  if(isValid){
    const salt = await bcrypt.genSalt(superSalt)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser =await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role:role?role:'USER',
      leaves:[],
      dateOfJoining,
      department,
      address,
      phoneNumber,
      salary
    })
    res.status(201).json({
       message:"Account created successfully",
      })
    }
  }catch (error) {
    res.status(400).json({message:"Something went wrong, please try again"+error})
 }
}
export default signup;