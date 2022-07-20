import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import authRoute from './controllers/admin/authentication.controller'
import iniRoutes from './controllers/admin/initialize.controller';
import Globals from './globals';
import generic_crud_routes from './controllers/common/generic.controller';

dotenv.config();

Globals.Initialize();
const app = express();
app.use(express.json()) // middleware que transforma el cuerpo de una petición en un json
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors);

app.use('/api', authRoute);
app.use('/api', iniRoutes);
app.use('/api/generic', generic_crud_routes);

app.get('/', (_req, res) => {
    res.send('all is fine')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);

})

