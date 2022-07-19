import * as fs from 'fs';
import Globals from './globals';
export default class Utils {

    /**
     * Write, if not exist a file for all database logs
     * @param mesage log message
     * @param object json to string with all error  information
     */
    public static WriteDatabaseLog(message: string): void {
        try {

            // if directory does not exist then is created
            if(!fs.existsSync(`${Globals.applicationPath}/resources/database_logs`)){
                fs.mkdirSync(`${Globals.applicationPath}/resources/database_logs`,{recursive: true});
            }
            const fileName = new Date();
            const filePath = `${Globals.applicationPath}/resources/database_logs/${fileName.toLocaleDateString().replace(/\//g, '-')}.log`;
            fs.appendFile(filePath, message, (err) => {
                if(err){
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

}