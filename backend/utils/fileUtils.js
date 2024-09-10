import fs from 'fs';

export const uploadFileToGridFS = (filePath, fileName, bucket) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const uploadStream = bucket.openUploadStream(fileName);
    console.log('uploadStream',uploadStream);
    readStream.pipe(uploadStream)
      .on('error',(err)=> reject(err))
      .on('finish', () => {
        cleanupTempFile(filePath); // Clean up the temp file after upload
        const fileID = uploadStream.id;
        const baseUrl = process.env.BASE_URL
        const fileUrl = `${baseUrl}/files/${fileID}`; 
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