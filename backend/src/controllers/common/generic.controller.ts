import express from "express";
import GenericBusiness from "../../business/common/generic.business";
import { Ly6GenericRequestBody } from "../../types";

import Utils from "../../utils";
const generic_crud_routes = express.Router();

/**
 * write data on the table
 */
generic_crud_routes.post('/create', Utils.ValidateToken, async(req, res) => {
    try {
        const business = new GenericBusiness()
        const request:Ly6GenericRequestBody = req.body;
        await business.CreateData(request.table_name, request.data);
        const table_data = await business.ReadData(request.table_name);
        Utils.SendMessageToAllConnectedClients(JSON.stringify(table_data));
        
        res.status(200).send("Data saved!");
    } catch (error: any) {
        Utils.WriteLog(`An error occurred when creating generic data \n
        data: ${JSON.stringify(req.body)} \n
        Error: ${error.message}`);
        res.status(500).send(`An error occurred when creating generic data \n
        data: ${JSON.stringify(req.body)} \n
        Error: ${error.message}`);
    }
})

/**
 * read data from the table
 */
generic_crud_routes.get('/read', async (req, res) => {
    try {
        const client_id = Utils.SaveConnectedClient(res);

        const business = new GenericBusiness();
        const request:any = req.query as unknown;
        const data = await business.ReadData(request.table_name);
        req.on('close', () => {
            Utils.DisconnectClient(client_id)
        });
        Utils.SendMessageToAllConnectedClients(JSON.stringify(data));
    } catch (error: any) {
        Utils.WriteDatabaseLog(`An error has occurred in generic.controller: ${error}`);
        res.write(`An error has occurred in generic.controller: ${error}`)
        res.end();

    }
});

/**
 * update data on the table
 */
 generic_crud_routes.put('/update', Utils.ValidateToken, async(req, res) => {
    try {
        const business = new GenericBusiness()
        const request:Ly6GenericRequestBody = req.body;
        await business.UpdateData(request.table_name, request.data, request.id);
        const table_data = await business.ReadData(request.table_name);
        Utils.SendMessageToAllConnectedClients(JSON.stringify(table_data));
        
        res.status(200).send("Data updated!");
    } catch (error: any) {
        Utils.WriteLog(`An error occurred when creating generic data \n
        data: ${JSON.stringify(req.body)} \n
        Error: ${error.message}`);

        res.status(500).send(`An error occurred when creating generic data \n
        data: ${JSON.stringify(req.body)} \n
        Error: ${error.message}`);
    }
})

/**
 * update data on the table
 */
 generic_crud_routes.delete('/delete', Utils.ValidateToken, async(req, res) => {
    try {
        const business = new GenericBusiness()
        const request:Ly6GenericRequestBody = req.body;
        await business.DeleteData(request.table_name, request.id);
        const table_data = await business.ReadData(request.table_name);
        Utils.SendMessageToAllConnectedClients(JSON.stringify(table_data));
        
        res.status(200).send("The data has been deleted!");
    } catch (error: any) {
        Utils.WriteLog(`An error occurred when deleting generic data \n
        data: ${JSON.stringify(req.body)} \n
        Error: ${error.message}`);

        res.status(500).send(`An error occurred when deleting generic data \n
        data: ${JSON.stringify(req.body)} \n
        Error: ${error.message}`);
    }
})


export default generic_crud_routes;