import express from "express";
import InitializeDb from "../../business/admin/initialize.business";
const iniRoutes = express.Router();

iniRoutes.get('/initializedb', async (_req, res) => {
    try {
        console.log('Client connected')
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')

        res.write('Updating config databases, please wait until this process finish');
        const business = new InitializeDb();
        await business.UpdateAdminDb();

        res.write('Updating company databases, please wait until this process finish');
        await business.UpdateCompanyDb();
        
        res.write(`we're done`);
        res.on('close', () => {
            console.log('Client closed connection')
            res.end()
        })
    } catch (err: any) {
        res.write(JSON.stringify(err));
    }
})

export default iniRoutes;