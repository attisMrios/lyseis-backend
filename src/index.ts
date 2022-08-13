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
app.use('/uploads', express.static(Globals.applicationPath + '/uploads'));
app.use(express.static('public'))
console.log(Globals.applicationPath);


app.use('/api', auth_route);
app.use('/api', ini_routes);
app.use('/api/admin', admin_router);
app.use('/api/generic', generic_crud_routes);
app.use('/api/files', files_router)

// CREATE SYSTEM PATHS

if(!fs.existsSync(Globals.applicationPath +'/uploads')){
    fs.mkdirSync(Globals.applicationPath +'/uploads');
}

if(!fs.existsSync(Globals.applicationPath +'/uploads/products')){
    fs.mkdirSync(Globals.applicationPath +'/uploads/products')
}

if(!fs.existsSync(Globals.applicationPath +'/uploads/third_party')){
    fs.mkdirSync(Globals.applicationPath +'/uploads/third_party');
}


app.get('/', (_req, res) => {
    res.send('all is fine')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})


