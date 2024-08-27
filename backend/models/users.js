import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name:{
   type:String,
   required:[true,"Please enter your name"],
   maxLength:[20,"Nmae canot be greater then 20 characters"],
  },
 email:{
  type:String,
  required:[true,"Please enter your email"],
  unique:true,
  validate:[validator.isEmail,"Please enter a valid email"]
 },
 password:{
  type:String,
  required:[true,"Please enter your password"],
  maxLength:60
 },
 role:{
  type:String,
  required:[true,"Role is required"],
  default:'USER'
 },
 imageUrl:{
  type:String,
  default:''
 },
isActive:{
  type:Boolean,
  default:false
},

})

const user = mongoose.model("user",userSchema)

export default user;