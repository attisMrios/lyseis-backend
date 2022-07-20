
import DataBase from "../../database";
import Utils from "../../utils";
export default class GenericBusiness {
    get_data(table_name: string): Promise<Array<any>> {
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
}