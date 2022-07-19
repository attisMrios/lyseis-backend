// https://www.youtube.com/watch?v=ZpY5KdGQvwI
import express from 'express';
import * as dotenv from 'dotenv';
import authRoute from './controllers/admin/authentication.controller'
import iniRoutes from './controllers/admin/initialize.controller';
import Globals from './globals';

dotenv.config();
Globals.Initialize();
const app = express();
app.use(express.json()) // middleware que transforma el cuerpo de una petición en un json

app.use('/api', authRoute);
app.use('/api', iniRoutes);



app.get('/', (_req, res) => {
    res.send('all is fine')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);

})