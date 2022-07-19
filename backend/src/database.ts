import { Client } from "pg";
import Utils from "./utils";

export default class DataBase<T> {

    private dataBaseConnection: Client | undefined;
    private schema: string | undefined;

    constructor(schema?: string) {
        this.schema = schema;
    }

    Query(sql: string): Promise<Array<T> | undefined> {

        return new Promise((resolve, reject) => {
            try {
                this.connect();
                this.dataBaseConnection?.query(sql)
                    .then(dbResult => {
                        resolve(dbResult.rows);
                        this.CloseConnection();
                    })
                    .catch(error => {
                        reject(error);
                        this.CloseConnection();
                        Utils.WriteDatabaseLog(`Error executing the sql: ${sql} \n ${error.message}`);
                    });

            } catch (error: any) {
                Utils.WriteDatabaseLog(`Error executing the sql: ${sql} \n ${error.message}`,);
                this.CloseConnection();
                reject(error);
            }
        })
    }

    private connect() {
        this.dataBaseConnection = new Client({
            host: process.env.HOST,
            user: process.env.DB_USER,
            port: parseInt(process.env.DB_PORT || "5432"),
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        });

        this.dataBaseConnection.connect()
            .catch(error => {
                Utils.WriteDatabaseLog(error.message);
            });
        if (this.schema) {
            this.dataBaseConnection?.query(`set search_path to ${this.schema}`)
        } else {
            this.dataBaseConnection?.query(`set search_path to ${process.env.DEFAULT_SCHEMA}`)
        }
    }

    CloseConnection() {
        this.dataBaseConnection?.end();
    }

}