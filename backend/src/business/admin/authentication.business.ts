import * as jwt from 'jsonwebtoken'
import DataBase from '../../database'
import UsersEntity from '../../entities/admin/users.entity';
import Utils from '../../utils';
export default class AuthenticationBusiness {
    
    /**
     * Return token to authorize request
     * @param user authenticated user
     * @param password password to validate
     * @returns token
     */
    GetToken(user: string, password: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                // first of all find the user on admin database
                const db = new DataBase();
                const user_info = await db.Query<UsersEntity>(`select * from users where user_name = '${user}'`);
                if (user_info) {
                    if (user_info.length > 0) {
                        if (password == Utils.Decrypt(user_info[0].password)) {
                            user_info[0].password = '';
                            console.log(process.env.LY6SECRET)
                            let token = jwt.sign({user}, process.env.LY6SECRET as string, { expiresIn: '8h' });
                            resolve(token);
                        } else {
                            reject('Unauthorized');
                        }
                    } else {
                        reject('Unauthorized');
                    }
                } else {
                    reject('Unauthorized');
                }
            } catch (error) {
                const error_description = `An error has occurred when validating credentials`;
                Utils.WriteLog(error_description);
                reject(error_description);
            }
        })
    }
}