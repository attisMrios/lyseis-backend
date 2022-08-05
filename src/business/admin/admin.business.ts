
import DataBase from '../../database'
import MenuEntity from '../../entities/admin/menu.entity';
import Utils from '../../utils';
export default class AdministratorBusiness {
    
    /**
     * Get all menu
     * @returns Array with all menu
     */
    GetMenu(condition: string): Promise<Array<MenuEntity>> {
        return new Promise(async (resolve, reject) => {
            try {
                // first of all find the user on admin database
                const db = new DataBase();
                if(condition){
                    condition = ` where ${condition}`;
                }
                const menu: any = await db.Query<MenuEntity>(`select * from menu ${condition}`);
                resolve(menu);
            } catch (error: any) {
                const error_description =error.message;
                Utils.WriteLog(error_description);
                reject(error_description);
            }
        })
    }
}