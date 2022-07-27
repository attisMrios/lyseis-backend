import express from "express";
import GenericBusiness from "../../business/common/generic.business";
import { Ly6GenericRequestBody, Ly6Response } from "../../types";

import Utils from "../../utils";
const generic_crud_routes = express.Router();

/**
 * write data on the table
 */
generic_crud_routes.post('/create', Utils.ValidateToken, async(req, res) => {
    let response: Ly6Response<any>;
    try {
        const business = new GenericBusiness()
        const request:Ly6GenericRequestBody = req.body;
        await business.CreateData(request.process, request.data);
        const table_data = await business.ReadData(request.process);
        Utils.SendMessageToAllConnectedClients(JSON.stringify(table_data), request.process);
        response = {
            message: 'Data was saved!'
        }
        res.status(200).send(response);
    } catch (error: any) {
        response = {
            message: error.message,
            data: `An error occurred when creating generic data \n
            data: ${JSON.stringify(req.body)} \n
            Error: ${error}`
        }
        Utils.WriteLog(`An error occurred when creating generic data \n
        data: ${JSON.stringify(req.body)} \n
        Error: ${error.message}`);
        res.status(500).send(response);
    }
})

/**
 * read data from the table
 */
generic_crud_routes.get('/read', async (req, res) => {
    try {
        const request:any = req.query as unknown;
        const client_id = Utils.SaveConnectedClient(res, request.process);
        const business = new GenericBusiness();
        const data = await business.ReadData(request.process);
        req.on('close', () => {
            Utils.DisconnectClient(client_id)
        });
        Utils.SendMessageToAllConnectedClients(JSON.stringify(data), request.process);
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
        await business.UpdateData(request.process, request.data);
        const table_data = await business.ReadData(request.process);
        Utils.SendMessageToAllConnectedClients(JSON.stringify(table_data), request.process);
        
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
        const request:Ly6GenericRequestBody = req.query as any;
        await business.DeleteData(request.process, request.id);
        const table_data = await business.ReadData(request.process);
        Utils.SendMessageToAllConnectedClients(JSON.stringify(table_data), request.process);
        
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

generic_crud_routes.post('/searchbyfield', Utils.ValidateToken,async (req, res) => {
    try {
        let response: Ly6Response<any> = {message: ''};
        const business = new GenericBusiness();
        const request: Ly6GenericRequestBody = req.body;
        let data = await business.SearchByField(request.process, request.data)
        response = data;
        res.status(200).send(response);
    } catch (error:any) {
        let response:Ly6Response<any> = {
            message: error.message
        }

        res.status(500).send(response)
    }
})


export default generic_crud_routes;