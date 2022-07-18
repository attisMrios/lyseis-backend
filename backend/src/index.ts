// https://www.youtube.com/watch?v=ZpY5KdGQvwI
import express from 'express';
import * as dotenv from 'dotenv';
import authRoute from './controllers/admin/authentication.controller'
import {Client} from 'pg';

dotenv.config();
const app = express();
app.use(express.json()) // middleware que transforma el cuerpo de una petición en un json

app.use('/api', authRoute);

const adminConnection = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: parseInt(process.env.PORT || "5432"),
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



adminConnection.connect()
adminConnection.query(`set search_path to ${process.env.ADMIN_DEFAULT_SCHEMA}`)


adminConnection.query(`select * from companies`).then(data => {
    console.log(data.rows);
}).catch(err => {
    console.log(err);
});


const companyConnection = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: parseInt(process.env.PORT || "5432"),
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

companyConnection.connect()
companyConnection.query(`set search_path to ${process.env.DEFAULT_SCHEMA}`).then(edt => {
    console.log(edt);
})
.catch(error => {
    console.log(error);
});

companyConnection.query(`select * from empresas`).then(data => {
    console.log(data.rows);
}).catch(err => {
    console.log(err.message);
});



// app.get('/', (_req, res) => {
//     console.log('Client connected')
//     res.setHeader('Content-Type', 'text/event-stream')
//     res.setHeader('Access-Control-Allow-Origin', '*')

//     const intervalId = setInterval(() => {
//         const date = new Date().toLocaleString()
//         res.write(`data: ${date}\n\n`)
//     }, 1000)

//     res.on('close', () => {
//         console.log('Client closed connection')
//         clearInterval(intervalId)
//         res.end()
//     })
// })
app.get('/', (_req, res) => {
    res.send('all is fine')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);

})