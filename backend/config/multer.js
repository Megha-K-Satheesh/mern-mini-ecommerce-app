import fs from 'fs';
import multer from "multer";
import path from 'path';

const uploadDir = path.resolve('uploads')
//if not exist, create new folder with the name 'uploads'
if(!fs.existsSync(uploadDir)){
fs.mkdirSync(uploadDir, {recursive:true}) //create nested parent folder if needed
}

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,uploadDir);
  },
  filename:function(req,file,cb){
     
    cb(null,Date.now()+"-"+file.originalname);
  },
    
  
})

const upload = multer({storage:storage,
  limits:{
    fileSize: 3*1024*1024
  },
  fileFilter:function(req,file,cb){
    const allowed = /jpeg|jpg|png|webp/
  
    let extname = path.extname(file.originalname).toLowerCase()
    allowed.test(extname) ? cb(null,true) : 
                            cb(new Error('Only images allowed'))
  }
})


export default upload;