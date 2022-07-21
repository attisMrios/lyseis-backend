
import DataBase from "../../database";
import Utils from "../../utils";
export default class GenericBusiness {


    /**
     * Write data on table
     * @param table_name Table name
     * @param data data from body
     * @returns Promise
     */
    CreateData(table_name: string, data: any) {
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
                            values.push(data[field]);
                        }
                    }
                }

                let sql = `insert into ${table_name} (${fields.join()}) values(${values.join()})`;
                const queryResponse = await db.Query(sql);
                resolve(queryResponse);


            } catch (error: any) {
                let errorDescription = `An error occurred creating data \n
                Error: ${error.message} \n
                Method: GenericBusiness.CreateData\n
                Params: table_name: ${table_name} - data: ${JSON.stringify(data)}`;
                Utils.WriteLog(errorDescription);
                reject(errorDescription);
            }
        });
    }

    /**
     * Read all data from table
     * @param table_name Table name
     * @returns promise
     */
    ReadData(table_name: string): Promise<Array<any>> {
        return new Promise(async (resolve, reject) => {
            try {
                let data: any;
                const db = new DataBase('lyseis');
                data = await db.Query(`select * from ${table_name}`)
                resolve(data);
            } catch (error: any) {
                let errorDescription = `An error has occurred when read data from table ${table_name}\n
                Error: ${error.message}`;
                Utils.WriteLog(errorDescription);
                reject(errorDescription);
            }
        })
    }

    /**
     * Update the data on the table
     * @param table_name Table name
     * @param data data sent in the request body
     * @param conditions conditions object for update the data
     */
    UpdateData(table_name: string, data: any, key: number): Promise<void> {
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

                let sql = `update ${table_name} set ${arrayFields.join()} where id = ${key}`;
                await db.Query(sql);
                resolve();
            } catch (error: any) {
                let errorDescription = `An error occurred when update the table: ${table_name}\n
                Error: ${error.message} \n
                Data: ${JSON.stringify(data)}
                Reference: ${table_name}.id = ${key}`
                Utils.WriteLog(errorDescription);
                reject(errorDescription);
            }
        })
    }

    /**
     * Delete data from table
     * @param table_name Table name
     * @param id primary key of table
     * @returns promise void
     */
    DeleteData(table_name: string, id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = new DataBase('lyseis');
                let sql = `delete from ${table_name} where id = ${id}`;
                await db.Query(sql);
                resolve();
            } catch (error: any) {
                const errorDescription = `An error has occurred when deleting data from table ${table_name} \n
                Error: ${error.mesage}\n
                Id: ${id}`;
                reject(errorDescription);
            }
        })
    }
}