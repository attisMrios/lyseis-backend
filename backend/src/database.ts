import { Client } from "pg";

export default class DataBase<T> {

    private dataBaseConnection: Client | undefined;
    private schema: string | undefined;

    constructor(schema?: string) {
        this.schema = schema;
        this.connect();
    }

    Query(sql: string): Promise<Array<T> | undefined> {

        return new Promise((resolve, reject) => {
            try {

                this.dataBaseConnection?.query(sql)
                    .then(dbResult => {
                        resolve(dbResult.rows);
                    })
                    .catch(error => {
                        reject(error);
                    });

            } catch (error) {
                console.log(error);
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
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
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




    // adminConnection.connect()
    // adminConnection.query(`set search_path to ${process.env.ADMIN_DEFAULT_SCHEMA}`)


    // adminConnection.query(`select * from companies`).then(data => {
    //     console.log(data.rows);
    //     adminConnection.end();
    // }).catch(err => {
    //     console.log(err);
    //     adminConnection.end();
    // });


    // const companyConnection = new Client({
    //     host: process.env.HOST,
    //     user: process.env.USER,
    //     port: parseInt(process.env.PORT || "5432"),
    //     password: process.env.PASSWORD,
    //     database: process.env.DATABASE
    // });

    // companyConnection.connect()
    // companyConnection.query(`set search_path to ${process.env.DEFAULT_SCHEMA}`)
    //     .then(edt => {
    //         console.log(edt);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });


    // companyConnection.query(`select * from empresas`)
    //     .then(data => {
    //         console.log(data.rows);
    //         companyConnection.end();
    //     }).catch(err => {
    //         console.log(err.message);
    //         companyConnection.end();
    //     });


}