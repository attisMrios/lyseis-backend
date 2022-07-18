import express from 'express';
const router = express.Router();

router.get('/token', (_req, res) => {
    res.send('pending get jwt token')
})