import express from 'express';
import AdministratorBusiness from '../../business/admin/admin.business';
import MenuEntity from '../../entities/admin/menu.entity';
import { Ly6Response } from '../../types';
import Utils from '../../utils';


const admin_router = express.Router();

admin_router.get('/menu', Utils.ValidateToken, async (req, res) => {
    try {
        const business = new AdministratorBusiness();
        const request: any = req.query;
        let menu = await business.GetMenu(request.condition);
        let response: Ly6Response<Array<MenuEntity>> = {message: '', data: menu}
        res.status(200).send(response);
    } catch (error) {
        let errorDescription: Ly6Response<any> = {
            message: `An error was ocurred when getting the menu`,
            data: error
        }
        res.status(500).send(errorDescription)
    }
});

export default admin_router;