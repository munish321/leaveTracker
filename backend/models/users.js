import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName:{
   type:String,
   required:[true,"Please enter your name"],
   maxLength:[20,"Nmae canot be greater then 20 characters"],
  },
  lastName:{
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
phoneNumber:{
  type:String,
  required:[true,"Phone number is required"],
  maxLength:[17,"Phone number canot be greater then 17 characters"]
},
address:{
  type:String,
  required:[true,"Address is required"],
},
department:{
  type:String,
  required:[true,"Department is required"],
},
designation:{
  type:String,
  required:[true,"Designation is required"],
},
dateOfJoining:{
  type:Date,
  required:[true,"Date of joining is required"],
},
salary:{
  type:Number,
  required:[true,"Salary is required"],
},
leaves:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'leave'
}],
supervisor:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'user'
}


})

const user = mongoose.model("user",userSchema)

export default user;