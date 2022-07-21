import * as fs from 'fs';
import DataBase from '../../database';
import globals from '../../globals';
export default class InitializeDb {

    /**
     * create company database schemas 
     * @returns Promise
     */
    UpdateCompanyDb(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
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

    /**
     * Insert initial info
     * @returns promise void
     */
    InitializeDataBase(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = new DataBase();
                const created_at = new Date();
                await db.Query(`INSERT INTO admin_lyseis.companies (tax_information_number,digit,company_name,address,phone_number,mobile_number,email,web_site,logo_url,city_name, created_at)
            VALUES (1,'1','lyseis','Pereira','3178915937','3178915937','attiscolombia@gmail.com','-','-','Pereira', '${created_at.toLocaleDateString()}');`);

                await db.Query(`INSERT INTO admin_lyseis.users (user_name,"password",created_at)
            VALUES ('admin','6501e78d4ca7dca036bee439ed028401:ed8ba8605d63b2a8216638dbcf317be8','${created_at.toLocaleDateString()}');`);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}