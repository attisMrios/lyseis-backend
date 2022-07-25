import express from 'express';
import AuthenticationBusiness from '../../business/admin/authentication.business';

const authRouter = express.Router();

authRouter.post('/token', async (req, res) => {
    try {
        let busines = new AuthenticationBusiness();
        let token = await busines.GetToken(req.body.user, req.body.password);
        res.status(200).send({token: token});
    } catch (error) {
        res.status(401).send(`Sorry you are not authorized`)
    }
});

export default authRouter;