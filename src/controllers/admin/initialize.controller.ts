import express from "express";
import InitializeBusiness from "../../business/admin/initialize.business";
import { Ly6Response } from "../../types";
const iniRoutes = express.Router();

/**
 * Create the schemas
 */
iniRoutes.post('/initializedb', async (_req, res) => {
    try {
        let adminErrorList: Array<any>;
        let companyErrorList: Array<any>;
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')

        res.write('Updating config databases, please wait until this process finish\n');
        const business = new InitializeBusiness();
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

/**
 * Create initial info
 */
iniRoutes.get('/getstarted', async (_req, res) => {
    try {
        const busines = new InitializeBusiness();
        await busines.InitializeDataBase();
        res.status(200).send("now you can login on lyseis")
    } catch (error: any) {
        console.log(error);
        let err: Ly6Response<any> = {message: error}
        res.status(500).send(err);
    }
})

iniRoutes.get('/updatedb', async (_req, res) => {
    try {
        const busines = new InitializeBusiness();
        await busines.UpdateDatabase();
        res.status(200).send("Database was updated")
    } catch (error: any) {
        console.log(error);
        let err: Ly6Response<any> = {message: error}
        res.status(500).send(err);
    }
})

export default iniRoutes;