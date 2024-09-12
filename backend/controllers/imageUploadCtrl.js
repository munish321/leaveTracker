import mongoose from "mongoose"
import User from "../models/users.js"
import {uploadFileToGridFS,deleteFileFromGridFS} from "../utils/fileUtils.js"

export const imageUpload = async (req,res)=>{
  const image = req.files[0]
  const user = req.user
  const bucket = req.bucket
  try {
    if(!image){
      return res.status(400).json({message:"image is required"})
    }
    if(!user){
      return res.status(400).json({message:"user is not Authenticated"})
    }
    if(user.imageUrl){
      let imageId = user?.imageUrl?.split('/')?.pop()
      if(imageId){
        let c =await deleteFileFromGridFS(imageId,bucket)
      }
    }
    const imageId = await uploadFileToGridFS(image.filepath,image.originalFilename,bucket)
    const response = await User.findByIdAndUpdate(user._id,{imageUrl:imageId})
    res.status(200).json({message:"image uploaded successfully",data:response})
  } catch (error) {
    return res.status(400).json({message:"Somthing went wrong."})
  }
 
}

export const getUpdatedImage =(req,res)=>{
    const bucket = req.bucket
    const fileId = req.params.id
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(String(fileId)))
    downloadStream.on("error",(err)=>{
      console.log('error=>',err)
       res.status(400).json({message:"file not found"})
    })
    downloadStream.on('file', (file) => {
      res.set({
        'Content-Type': file.contentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.filename}"`,
      });
    });
    const lal = downloadStream.pipe(res);
    console.log('lal',res)
}