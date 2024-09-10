import User from "../models/users.js"
import {uploadFileToGridFS} from "../utils/fileUtils.js"

export const imageUpload = async (req,res)=>{
  console.log('files =c>',req.files[0])
  const image = req.files[0]
  const user = req.user
  const bucket = req.bucket
  if(!image){
    return res.status(400).json({message:"image is required"})
  }
  if(!user){
    return res.status(400).json({message:"user is not Authenticated"})
  }
  const imageId = await uploadFileToGridFS(image.filepath,image.originalFilename,bucket)
  const response = await User.findByIdAndUpdate(user._id,{imageUrl:imageId})
  res.status(200).json({message:"image uploaded successfully",data:response})

}

export const getUpdatedImage =(req,res)=>{
  console.log('req.params.id',req.params.id)
    const bucket = req.bucket
    const fileId = req.params.id
    const downloadStream = bucket.openDownloadStream(new ObjectID(fileId))
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
    console.log('lal',lal)
}