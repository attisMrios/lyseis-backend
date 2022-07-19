import express from 'express';
import AuthenticationBusiness from '../../business/admin/authentication.business';
import globals from '../../globals';

const authRouter = express.Router();

authRouter.get('/token', (_req, res) => {
    let busines = new AuthenticationBusiness()
    res.send(busines.GetToken())
    console.log(globals.applicationPath);
    
});

export default authRouter;