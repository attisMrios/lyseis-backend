import express from 'express';
import multer from 'multer'
import * as fs from 'fs';
import Utils from '../../utils';

const upload = multer({dest: 'uploads'})

const files_router = express.Router();
files_router.post('/productimage', upload.single('file'), (req, res) =>{
    try {
        // mueve el archivo al lugar indicado
        fs.rename(req.file?.path as any, `uploads/products/${req.body.name}`,(err) => {
            if(err){
                res.status(500).send({message: err.message})
            }
        })
        res.status(200).send({message: "all is ok"})
    } catch (error: any) {
        let response = {
            message: error.message,
            data: `An error occurred when saving file ${req.body.name} \n
            data: ${JSON.stringify(req.body)} \n
            Error: ${error}`
        }
        Utils.WriteLog(`An error occurred when saving file ${req.body.name} \n
        data: ${JSON.stringify(req.body)} \n
        Error: ${error.message}`);
        res.status(500).send(response);
    }
});

export default files_router;