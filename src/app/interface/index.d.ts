import { JwtPayload } from 'jsonwebtoken';
console.log('JwtPayload: ', JwtPayload);
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
