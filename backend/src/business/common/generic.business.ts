
import DataBase from "../../database";
import { Ly6Response } from "../../types";
import Utils from "../../utils";
export default class GenericBusiness {

    /**
     * Write data on table
     * @param process Table name
     * @param data data from body
     * @returns Promise
     */
    CreateData(process: string, data: any):Promise<Ly6Response<any>> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = new DataBase('lyseis');
                let fields: Array<string> = [];
                let values: Array<any> = [];
                for (const field in data) {
                    if (Object.prototype.hasOwnProperty.call(data, field)) {
                        fields.push(field);
                        if (typeof (data[field]) == "string") {
                            values.push(`\'${data[field]}\'`)
                        } else {
                            if(field == 'id'){
                                values.push(`(select max(id)+1 from ${process})`)
                            } else {
                                values.push(data[field]);
                            }
                        }
                    }
                }

                let sql = `insert into ${process} (${fields.join()}) values(${values.join()})`;
                const queryResponse = await db.Query(sql);
                let response: Ly6Response<any> = {
                    message: 'Data was saved',
                    data: queryResponse
                }
                resolve(response);


            } catch (error: any) {
                let errorDescription = `An error occurred creating data \n
                Error: ${error.message} \n
                Method: GenericBusiness.CreateData\n
                Params: process: ${process} - data: ${JSON.stringify(data)}`;
                let response: Ly6Response<any> = {
                    message: error.message,
                    data: errorDescription
                }
                
                Utils.WriteLog(errorDescription);
                reject(response);
            }
        });
    }

    /**
     * Read all data from table
     * @param process Table name
     * @returns promise
     */
    ReadData(process: string): Promise<Array<any>> {
        return new Promise(async (resolve, reject) => {
            try {
                let data: any;
                const db = new DataBase('lyseis');
                data = await db.Query(`select * from ${process}`)
                resolve(data);
            } catch (error: any) {
                let errorDescription = `An error has occurred when read data from table ${process}\n
                Error: ${error.message}`;
                Utils.WriteLog(errorDescription);
                reject(errorDescription);
            }
        })
    }

    /**
     * Update the data on the table
     * @param process Table name
     * @param data data sent in the request body
     * @param conditions conditions object for update the data
     */
    UpdateData(process: string, data: any, key: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = new DataBase("lyseis");
                let arrayFields: Array<string> = [];

                for (const key in data) {
                    if (Object.prototype.hasOwnProperty.call(data, key)) {
                        if (typeof (data[key]) == 'string') {
                            arrayFields.push(`${key} = '${data[key]}'`)
                        } else {
                            arrayFields.push(`${key} = ${data[key]}`)
                        }
                    }
                }

                let sql = `update ${process} set ${arrayFields.join()} where id = ${key}`;
                await db.Query(sql);
                resolve();
            } catch (error: any) {
                let errorDescription = `An error occurred when update the table: ${process}\n
                Error: ${error.message} \n
                Data: ${JSON.stringify(data)}
                Reference: ${process}.id = ${key}`
                Utils.WriteLog(errorDescription);
                reject(errorDescription);
            }
        })
    }

    /**
     * Delete data from table
     * @param process Table name
     * @param id primary key of table
     * @returns promise void
     */
    DeleteData(process: string, id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = new DataBase('lyseis');
                let sql = `delete from ${process} where id = ${id}`;
                await db.Query(sql);
                resolve();
            } catch (error: any) {
                const errorDescription = `An error has occurred when deleting data from table ${process} \n
                Error: ${error.mesage}\n
                Id: ${id}`;
                reject(errorDescription);
            }
        })
    }

    /**
     * Search by field
     * @param process table name
     * @param data field=value
     * @returns array
     */
    SearchByField(process: string, data: number): Promise<Ly6Response<Array<any>>> {
        return new Promise( async (resolve, reject) => {
            try {
                let response: Ly6Response<Array<any>> = {message: ''};
                const db = new DataBase('lyseis');
                let sql = `select * from ${process} where ${data}`;
                response.data = await db.Query(sql);
                resolve(response);
            } catch (error: any) {
                let response: Ly6Response<any> = {
                    message: error.message,
                    data: error
                }
                reject(response)
            }
        })
    }
}