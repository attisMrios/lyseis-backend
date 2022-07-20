import { Ly6ConnectedClient } from "./types";

export default class Globals{
    public static applicationPath: string;
    public static connected_clients: Array<Ly6ConnectedClient>

    public static Initialize() {
        Globals.applicationPath = __dirname;
        Globals.connected_clients = new Array<Ly6ConnectedClient>();
    }

}