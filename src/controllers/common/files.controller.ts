import express from 'express';
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads')
    },
    filename: (_req, file, cb) => {
        console.log(_req);
        
        cb(null, file.fieldname)
    }
})

const upload = multer({storage: storage})

const files_router = express.Router();
files_router.post('/productimage', upload.single('productimage'), (_req, res) =>{
    res.send({message: "all is ok"})
});

export default files_router;