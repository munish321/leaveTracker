import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import authRoutes from "./routes/authRoute.js"
dotenv.config()
const app = express();
// middle wares
app.use(express.json())
app.use(cors())
try {
  mongoose.connect(process.env.MONGO_URL).then(res=>{
    console.log("MongoDB connected",res)
    console.log(process.env.MONGO_URL)
  }).catch(err=>{
    console.log(err)
  })
} catch (error) {
  console.log('MongoDB not connected')
}
// routes below
app.use('/api',authRoutes)
app.listen(4000, () => {
  console.log("Server started on port 4000");
});