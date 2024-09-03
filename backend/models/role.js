import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
   name:{
    type:String,
    required:[true,"Role name is required"],
    unique:true,
   },
   code:{
    type:String,
    unique:true,
    required:[true,"code is a required field"]
   }
})

const role = mongoose.model("role",rolesSchema)

export default role;