import formidable from "formidable";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const temp = path.join(dirname, "temp");
if(!fs.existsSync(temp)){
  fs.mkdirSync(temp);
}

export const parseForm = (req,res,next)=>{
    const form = formidable({
        uploadDir: temp,
        keepExtensions: true,
        multiples: false,
        maxFileSize: 2 * 1024 * 1024, // 2 MB
        maxTotalFileSize: 2 * 1024 * 1024 // Max total size for all files
    })

    form.parse(req, (err, fields, files) => {
        if(err) {
          if(err.code === 1009){
            return res.status(413).json({message:"File size should be less than 2 MB."})
          }
          return res.status(500).json({message:"Something went wrong while parsing form."})
        }
        req.files = files.files
        next()
    })
}