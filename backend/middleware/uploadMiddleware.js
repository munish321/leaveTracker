import formidable from "formidable";
import fs from "fs";
import path from "path";

const temp = path.join(__dirname, "temp");
if(!fs.existsSync(temp)){
  fs.mkdirSync(temp);
}

export const parseForm = (req,res,next)=>{
    const form = new formidable.IncomingForm({
        uploadDir: temp,
        keepExtensions: true,
        multiples: false,
        maxFileSize: 5 * 1024 * 1024 // 5 MB
    })

    form.parse(req, (err, fields, files) => {
        if(err) {
          console.log('err',err)
          return res.status(500).json({message:"Something went wrong while parsing form."})
        }
        req.body = fields
        req.files = files
        next()
    })
}