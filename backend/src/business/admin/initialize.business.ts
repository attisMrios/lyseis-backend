import * as fs from 'fs';
import DataBase from '../../database';
import globals from '../../globals';
export default class InitializeDb {

    UpdateCompanyDb(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                // read the sql file for admin script
                fs.readFile(`${globals.applicationPath}/resources/lyseis_database.sql`, 'utf8', (err, data) => {
                    if (err) {
                        reject("is not possible to read the database scripts");
                    } else {
                        let scripts: Array<string> = data.split(';');
                        let db = new DataBase('lyseis');
                        for (let i = 0; i < scripts.length; i++) {
                            db.Query(scripts[i]);
                        }
                        // db.CloseConnection();
                        resolve();
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
    UpdateAdminDb(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                // read the sql file for admin script
                fs.readFile(`${globals.applicationPath}/resources/admin_database.sql`, 'utf8', (err, data) => {
                    if (err) {
                        reject({ message: "is not possible to read the database scripts", err });
                    } else {
                        let scripts: Array<string> = data.split(';');
                        let db = new DataBase();
                        for (let i = 0; i < scripts.length; i++) {
                            db.Query(scripts[i]);
                        }
                        // db.CloseConnection();
                        resolve();
                    }
                })

            } catch (error) {
                reject(error);
            }
        })
    }

}