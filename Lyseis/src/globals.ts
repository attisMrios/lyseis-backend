import { Ly6ConnectedClient } from "./types";
import * as crypto from 'crypto';

export default class Globals{
    public static applicationPath: string;
    public static connected_clients: Array<Ly6ConnectedClient>;
    public static crypto_algorithm = 'aes-256-cbc';
    public static crypto_key: Buffer;
    public static crypto_iv: Buffer;

    public static Initialize() {
        Globals.applicationPath = __dirname;
        Globals.connected_clients = new Array<Ly6ConnectedClient>();
        Globals.crypto_key  = crypto.randomBytes(32);
        Globals.crypto_iv = crypto.randomBytes(16);
    }

}