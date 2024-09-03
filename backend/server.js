import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import authRoutes from "./routes/authRoute.js"
import leaveRoutes from "./routes/leaveRoute.js"
import roleRoute from "./routes/roleRoute.js"
dotenv.config()
const app = express();
// middle wares
app.use(express.json())
app.use(cors())
try {
  mongoose.connect(process.env.MONGO_URL).then(res=>{
  }).catch(err=>{
    console.log(err)
  })
} catch (error) {
}
// routes below
app.use('/api',authRoutes)
app.use('/api',leaveRoutes)
app.use('/api',roleRoute)
app.listen(4000, () => {
});