import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import authRoutes from "./routes/authRoute.js"
import leaveRoutes from "./routes/leaveRoute.js"
import roleRoute from "./routes/roleRoute.js"
import imageUploadRouter from "./routes/imageUploadRoute.js"
import userRouter from "./routes/userRoute.js"
dotenv.config()
const app = express();
// middle wares
app.use(express.json())
app.use(cors())

// setup for mongodb connection
let db,bucket;
const dbName = process.env.MONGO_DB_NAME
try {
  mongoose.connect(process.env.MONGO_URL).then(client=>{
     db = mongoose.connection.db;
     bucket = new mongoose.mongo.GridFSBucket(db,{bucketName:'uploads'})
  }).catch(err=>{
    console.log(err)
  })
} catch (error) {
}
// Middleware to attach bucket to req
const attachBucket = (req, res, next) => {
  if (!bucket) {
    return res.status(500).json({ message: 'Bucket not initialized' });
  }
  req.bucket = bucket; // Attach bucket to request object
  next();
};
// routes below
app.use('/api', authRoutes)
app.use('/api',leaveRoutes)
app.use('/api',roleRoute)
app.use('/api',userRouter)
app.use('/api',attachBucket,imageUploadRouter)
app.listen(4000, () => {
});