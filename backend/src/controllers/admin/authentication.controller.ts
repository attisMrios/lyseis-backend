import express from 'express';
import AuthenticationBusiness from '../../business/admin/authentication.business';

const authRouter = express.Router();

authRouter.get('/token', (_req, res) => {
    let busines = new AuthenticationBusiness()
    res.send(busines.GetToken())
});

export default authRouter;