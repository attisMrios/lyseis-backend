import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import auth_route from './controllers/admin/authentication.controller'
import ini_routes from './controllers/admin/initialize.controller';
import Globals from './globals';
import generic_crud_routes from './controllers/common/generic.controller';
import admin_router from './controllers/admin/admin.controller';
import files_router from './controllers/common/files.controller';
import * as fs from 'fs';

dotenv.config();

Globals.Initialize();
const app = express();
app.use(express.json()) // middleware que transforma el cuerpo de una petición en un json
app.use(cors())

app.use('/api', auth_route);
app.use('/api', ini_routes);
app.use('/api/admin', admin_router);
app.use('/api/generic', generic_crud_routes);
app.use('/api/files', files_router)

// CREATE SYSTEM PATHS

if(!fs.existsSync('/uploads')){
    fs.mkdirSync('/uploads');
}

if(!fs.existsSync('/uploads/products')){
    fs.mkdirSync('/uploads/products')
}

if(!fs.existsSync('/uploads/third_party')){
    fs.mkdirSync('/uploads/third_party');
}

app.get('/', (_req, res) => {
    res.send('all is fine')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})


