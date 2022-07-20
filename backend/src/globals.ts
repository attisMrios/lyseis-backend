import { lyseisClient } from "./types";

export default class Globals{
    public static applicationPath: string;
    public static connected_clients: Array<lyseisClient>

    public static Initialize() {
        Globals.applicationPath = __dirname;
        Globals.connected_clients = new Array<lyseisClient>();
    }

}