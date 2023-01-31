import express, {NextFunction, Request, Response} from 'express';
import userLogic from '../Logic/userLogic';
import Urls from '../Utils/urls';
import verifyAdmin from '../MiddleWare/verify-admin';
import verifyToken from '../MiddleWare/verify-token';

const router = express.Router();

router.get(Urls.getAllUsersURL, [verifyToken, verifyAdmin] ,async (request: Request, response: Response, next: NextFunction) => {
    try{
      response.status(200).json(await userLogic.getAllUsers())
    }catch(err){
      next(err);
    }
  })
  
router.get(Urls.getSingleUserURL, [verifyToken],async (request: Request, response: Response, next: NextFunction) => {
    try{
      const unique_id = request.params.unique_id;
      response.status(201).json(await userLogic.getSingleUser(unique_id));
    }catch(err){
      next(err);
    }
  })

  
export default router;