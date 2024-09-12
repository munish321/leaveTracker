import fs from 'fs';
import mongoose from 'mongoose';
export const uploadFileToGridFS = (filePath, fileName, bucket) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const uploadStream = bucket.openUploadStream(fileName);
    readStream.pipe(uploadStream)
      .on('error',(err)=> reject(err))
      .on('finish', () => {
        cleanupTempFile(filePath); // Clean up the temp file after upload
        const fileID = uploadStream.id;
        const baseUrl = process.env.BASE_URL
        const fileUrl = `${baseUrl}/api/image/${fileID}`; 
        resolve(fileUrl); // Resolve with the file's GridFS ID
      });
  });
};

export const saveDocument = async (collectionName, document, db) => {
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(document);
  return result.ops[0];
};

export const cleanupTempFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting temp file:', err);
    }
  });
};

// Function to delete image from GridFS
export const deleteFileFromGridFS = async (fileId, bucket) => {
  try {
    // Check if the fileId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return {message:'Invalid file ID',success:false};
    }
    const fileExists = await bucket.find({ _id: new mongoose.Types.ObjectId(String(fileId)) }).hasNext();
    if (!fileExists) {
      return {message:`File not found for id ${fileId}`,success:false};
    }
     await new Promise((resolve, reject) => {
      bucket.delete(new mongoose.Types.ObjectId(String(fileId)), (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
    return {message:'File deleted successfully',success:true};
  } catch (error) {
    return {message:error.message,success:false};
  }
};