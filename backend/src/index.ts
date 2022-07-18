// https://www.youtube.com/watch?v=ZpY5KdGQvwI
import express from 'express';
import * as dotenv from 'dotenv';
console.log('hola');
dotenv.config();
const app = express();
app.use(express.json()) // middleware que transforma el cuerpo de una petición en un jsson


app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
})

app.get('/', (_req, res) => {
    console.log('Client connected')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')

    const intervalId = setInterval(() => {
        const date = new Date().toLocaleString()
        res.write(`data: ${date}\n\n`)
    }, 1000)

    res.on('close', () => {
        console.log('Client closed connection')
        clearInterval(intervalId)
        res.end()
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);

})