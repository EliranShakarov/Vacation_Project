import express, {NextFunction, Request, Response} from 'express';
import authLogic from '../Logic/auth-logic';
import Urls from '../Utils/urls';
import Role from '../Models/role';
import verifyToken from '../MiddleWare/verify-token';

const router = express.Router();

router.post(Urls.registerURL, async (request: Request, response: Response, next: NextFunction) => {
    try{
    const newUser = request.body;
    newUser.role = Role.User;
    const token = await authLogic.registerAsync(newUser);
    response.set("authorization","Bearer " + token);
    response.status(201).json(newUser.user_name)
    }catch(err){
        next(err);
    }
  })
 
router.post(Urls.loginURL, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const credUser = request.body;
        const token = await authLogic.loginAsync(credUser);
        response.set("authorization","Bearer " + token);
        response.status(200).json(credUser.user_name);
    }catch(err){
        next(err);
    }
  })
 
  router.post(Urls.relogURL, verifyToken,async (request: Request, response: Response, next: NextFunction) => {
    try{
        const oldToken = request.header("authorization"); 
        const newToken = await authLogic.relogUser(oldToken);

        response.set("authorization","Bearer " + newToken);
        response.status(200).json("Welcome back");
    }catch(err){
        next(err);
    }
  })
 

export default router;
