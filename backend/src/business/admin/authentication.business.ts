import * as jwt from 'jsonwebtoken'
export default class AuthenticationBusiness {
    GetToken(){
        return jwt.sign({
            data: 'foobar'
          }, 'secret', { expiresIn: '1h' });
    }
}