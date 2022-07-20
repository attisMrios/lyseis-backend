
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
        return new Promise(async(resolve, reject) => {
            try {
                const db = new DataBase('lyseis');
                let fields: Array<string> = [];
                let values: Array<any> = [];
                for (const field in data) {
                    if (Object.prototype.hasOwnProperty.call(data, field)) {
                        fields.push(field);
                        if(typeof(data[field]) == "string"){
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
                Utils.WriteLog(`An error occurred creating data \n
                Error: ${error.message} \n
                Method: GenericBusiness.CreateData\n
                Params: table_name: ${table_name} - data: ${JSON.stringify(data)}`);
                reject(error);
            }
        });
    }

    /**
     * Read all data from table
     * @param table_name Table name
     * @returns promise
     */
    ReadData(table_name: string): Promise<Array<any>> {
        return new Promise(async (resolve, _reject) => {
            try {
                let data: any;
                const db = new DataBase('lyseis');
                data = await db.Query(`select * from ${table_name}`)
                resolve(data);
            } catch (error: any) {
                Utils.WriteDatabaseLog(`An error has occurred => ${error.message}`);
            }
        })
    }

    /**
     * Update the data on the table
     * @param table_name Table name
     * @param data data sent in the request body
     * @param conditions conditions object for update the data
     */
    UpdateData(table_name: string, data: any, conditions: { field: string; value: any; operator: string; }[]) {
        throw new Error("Method not implemented.");
    }
}