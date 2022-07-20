import * as fs from 'fs';
import Globals from './globals';
import { Ly6ConnectedClient } from './types';
export default class Utils {
    static DisconnectClient(client_id: number): void {
        Globals.connected_clients = Globals.connected_clients.filter(client => client.client_id !== client_id);
    }
    static SendMessageToAllConnectedClients(message: string) {
        Globals.connected_clients.forEach(client => {
           client.response.write("data: " +message+"\n\n");
            
        })
    }

    /**
     * Write, if not exist a file for all database logs
     * @param mesage log message
     * @param object json to string with all error  information
     */
    public static WriteDatabaseLog(message: string): void {
        try {

            // if directory does not exist then is created
            if(!fs.existsSync(`${Globals.applicationPath}/resources/database_logs`)){
                fs.mkdirSync(`${Globals.applicationPath}/resources/database_logs`,{recursive: true});
            }
            const fileName = new Date();
            const filePath = `${Globals.applicationPath}/resources/database_logs/${fileName.toLocaleDateString().replace(/\//g, '-')}.log`;
            fs.appendFile(filePath, message, (err) => {
                if(err){
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    public static WriteLog(message: string): void {
        try {

            let messageHeader = '-----------------------------------------------------\n';
            messageHeader += `date: ${new Date().toISOString()} \n`;
            messageHeader += '-----------------------------------------------------\n';
            messageHeader += message + '\n'
            messageHeader += '-----------------------------------------------------\n';
            messageHeader += '-----------------------------------------------------\n\n';
            // if directory does not exist then is created
            if(!fs.existsSync(`${Globals.applicationPath}/resources/logs`)){
                fs.mkdirSync(`${Globals.applicationPath}/resources/logs`,{recursive: true});
            }
            const fileName = new Date();
            const filePath = `${Globals.applicationPath}/resources/logs/${fileName.toLocaleDateString().replace(/\//g, '-')}.log`;
            fs.appendFile(filePath, messageHeader, (err) => {
                if(err){
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    public static SaveConnectedClient(res: any): number {
        const client_id = new Date().getTime();
        try {
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            };
            res.writeHead(200, headers);

            const new_client_connected: Ly6ConnectedClient = {
                client_id: client_id,
                process: "Generic",
                response: res
            };
    
            Globals.connected_clients.push(new_client_connected);
        } catch (error: any) {
            Utils.WriteDatabaseLog(`An error occurred while registering a client: ${error.mesage}`)
        }

        return client_id;
    }

}