import express from 'express';
import multer from 'multer'
import * as fs from 'fs';
import Utils from '../../utils';
import Globals from '../../globals';

const upload = multer({dest: 'uploads'})

const files_router = express.Router();
files_router.post('/productimage', upload.single('file'), (req, res) =>{
    try {
        // mueve el archivo al lugar indicado
        fs.rename(req.file?.path as any, `${Globals.applicationPath}/uploads/products/${req.body.name}`,(err) => {
            if(err){
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message: "all is ok"})
            }
        })
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
files_router.post('/thirdpartyimage', upload.single('file'), (req, res) =>{
    try {
        // mueve el archivo al lugar indicado
        fs.rename(req.file?.path as any, `${Globals.applicationPath}/uploads/third_party/${req.body.name}`,(err) => {
            if(err){
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message: "all is ok"})
            }
        })
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