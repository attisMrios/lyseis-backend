import express from "express";
import InitializeDb from "../../business/admin/initialize.business";
const iniRoutes = express.Router();

iniRoutes.post('/initializedb', async (_req, res) => {
    try {
        let adminErrorList: Array<any>;
        let companyErrorList: Array<any>;
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')

        res.write('Updating config databases, please wait until this process finish\n');
        const business = new InitializeDb();
        adminErrorList = await business.UpdateAdminDb();

        res.write('Updating company databases, please wait until this process finish \n');
        companyErrorList = await business.UpdateCompanyDb();
        
        res.write(`we're done\n`);
        res.write(JSON.stringify({adminErrorList, companyErrorList}));
        res.on('close', () => {
        })
        
        res.end()
    } catch (err: any) {
        res.write(JSON.stringify(err));
    }
})

export default iniRoutes;