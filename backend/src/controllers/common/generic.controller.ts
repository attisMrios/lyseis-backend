import express from "express";
import GenericBusiness from "../../business/common/generic.business";

import Utils from "../../utils";
const generic_crud_routes = express.Router();

/**
 * Get list of table
 */
generic_crud_routes.get('/', async (req, res) => {
    try {
        const client_id = Utils.SaveConnectedClient(res);

        const genericBusiness = new GenericBusiness();
        const table_name: string = req.query.table_name?.toString() as string;
        const data = await genericBusiness.get_data(table_name);
        req.on('close', () => {
            Utils.DisconnectClient(client_id)
        });
        Utils.SendMessageToAllConnectedClients(JSON.stringify(data));
    } catch (error: any) {
        Utils.WriteDatabaseLog(`An error has occurred in generic.controller: ${error.message}`);
    }
})


export default generic_crud_routes;