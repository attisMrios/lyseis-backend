import * as fs from 'fs';
import DataBase from '../../database';
import globals from '../../globals';
export default class InitializeDb {

    UpdateCompanyDb(): Promise<Array<any>> {
        return new Promise( (resolve, reject) => {
            try {
                let errorList: Array<any> = new Array<any>();
                // read the sql file for admin script
                fs.readFile(`${globals.applicationPath}/resources/lyseis_database.sql`, 'utf8', async (err, data) => {
                    if (err) {
                        reject("is not possible to read the database scripts");
                    } else {
                        let scripts: Array<string> = data.split(';');
                        let db = new DataBase('lyseis');
                        for (let i = 0; i < scripts.length; i++) {
                            try {
                                await db.Query(scripts[i]);
                            } catch (error: any) {
                                errorList.push(error.message)
                            }
                        }
                        resolve(errorList);
                    }
                })

            } catch (error) {
                reject(error);
            }
        })
    }

    /**
     * read the admin data base script to up date the database
     */
    UpdateAdminDb(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            try {
                let errorList = new Array<any>();
                // read the sql file for admin script
                fs.readFile(`${globals.applicationPath}/resources/admin_database.sql`, 'utf8', async (err, data) => {
                    if (err) {
                        reject({ message: "is not possible to read the database scripts", err });
                    } else {
                        let scripts: Array<string> = data.split(';');
                        let db = new DataBase();
                        for (let i = 0; i < scripts.length; i++) {
                            try {
                                await db.Query(scripts[i]);
                            } catch (error: any) {
                                errorList.push(error.message)
                            }
                        }

                        resolve(errorList);
                    }
                })

            } catch (error) {
                reject(error);
            }
        })
    }

}