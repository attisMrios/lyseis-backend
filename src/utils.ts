import * as fs from 'fs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken'
import Globals from './globals';
import { Ly6ConnectedClient, Ly6Modules } from './types';
export default class Utils {

    /**
     * Disconnect from Server Side Events
     * @param client_id Connected client id
     */
    static DisconnectClient(client_id: number): void {
        Globals.connected_clients = Globals.connected_clients.filter(client => client.client_id !== client_id);
    }   

    /**
     * Sen server side events message to all clients connected
     * @param message string with message
     */
    static SendMessageToAllConnectedClients(message: string, process: string) {
        Globals.connected_clients.forEach(client => {
            if(client.process == process) {
                client.response.write("data: " + message + "\n\n");
            }

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
            if (!fs.existsSync(`${Globals.applicationPath}/resources/database_logs`)) {
                fs.mkdirSync(`${Globals.applicationPath}/resources/database_logs`, { recursive: true });
            }
            const fileName = new Date();
            const filePath = `${Globals.applicationPath}/resources/database_logs/${fileName.toLocaleDateString().replace(/\//g, '-')}.log`;
            fs.appendFile(filePath, message, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Write error log message to file
     * @param message log message
     */
    public static WriteLog(message: string): void {
        try {

            let messageHeader = '-----------------------------------------------------\n';
            messageHeader += `date: ${new Date().toISOString()} \n`;
            messageHeader += '-----------------------------------------------------\n';
            messageHeader += message + '\n'
            messageHeader += '-----------------------------------------------------\n';
            messageHeader += '-----------------------------------------------------\n\n';
            // if directory does not exist then is created
            if (!fs.existsSync(`${Globals.applicationPath}/resources/logs`)) {
                fs.mkdirSync(`${Globals.applicationPath}/resources/logs`, { recursive: true });
            }
            const fileName = new Date();
            const filePath = `${Globals.applicationPath}/resources/logs/${fileName.toLocaleDateString().replace(/\//g, '-')}.log`;
            fs.appendFile(filePath, messageHeader, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Save info from client connected to server side events
     * @param res http response
     * @returns number id client connected to server side events
     */
    public static SaveConnectedClient(res: any, process: Ly6Modules): number {
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
                process: process,
                response: res
            };

            Globals.connected_clients.push(new_client_connected);
        } catch (error: any) {
            Utils.WriteDatabaseLog(`An error occurred while registering a client: ${error.mesage}`)
        }

        return client_id;
    }

    /**
     * Encrypt some text
     * @param text text to encrypt
     * @returns text encrypted
     */
    public static Encrypt(text: string): string {
        let encrypted_text = "";
        try {
            const iv = crypto.randomBytes(16);
            const key = crypto.createHash('sha256').update(process.env.LY6SECRET as string).digest('base64').substr(0, 32);
            const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()])
            encrypted_text = iv.toString('hex') + ':' + encrypted.toString('hex');
        } catch (error) {
            console.log(error);
        }
        return encrypted_text;
    }

    /**
     * Decrypt text
     * @param text encrypted text
     * @returns text decrypted
     */
    public static Decrypt(text: string): string {
        let decrypted_text = "";
        try {
            let arg: void[] = [];
            arg.shift();

            let textParts: any = text.split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedData = Buffer.from(textParts.join(':'), 'hex');
            const key = crypto.createHash('sha256').update(process.env.LY6SECRET as string).digest('base64').substr(0, 32);
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

            const decrypted = decipher.update(encryptedData);
            const decryptedText = Buffer.concat([decrypted, decipher.final()]);
            return decryptedText.toString();
        } catch (error) {
            console.log(error)
        }
        return decrypted_text;
    }

    public static ValidateToken(req: any, res: any, next: any) {
        try {
            const auth_header = req.headers['authorization'];
            let token: string = "";
            if(auth_header){
                token =  auth_header.split(' ')[1] as string; // valida que exista y toma la última posición del arreglo
            } else {
                return res.status(403).send({message: "Not authorized"});
            }

            if (token) {
                jwt.verify(token, process.env.LY6SECRET as string, (err: any, _decoded: any) => {
                    if(err){
                        return res.status(403).send({message: "Not authorized"});
                    } else {
                        next();
                    }
                });
            } else {
                return res.status(403).send({message: "Not authorized"});
            }
        } catch (error) {

        }
    }
}