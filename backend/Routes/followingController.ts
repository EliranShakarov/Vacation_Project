import express, {NextFunction, Request, Response} from 'express';
import followingLogic from '../Logic/followingLogic';
import Urls from '../Utils/urls';
import verifyToken from '../MiddleWare/verify-token';

const router = express.Router();

router.get(Urls.getAllFollowingForUserURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const user_name = request.params.user_name;
        response.status(200).json(await followingLogic.getAllFollowingForUser(user_name));
    }catch(err){
        next(err);
    }
})

router.post(Urls.addNewFollowingURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const newFollowing = request.body;
        response.status(201).json(await followingLogic.addNewFollowing(newFollowing));
    }catch(err){
        next(err);
    }
 })

router.delete(Urls.deleteFollowingURL, verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const user_name = request.params.user_name;
        const vacation_id = +request.params.vacation_id;
        response.status(204).json(await followingLogic.deleteFollowing(user_name,vacation_id));
    }catch(err){
        next(err);
    }
})

export default router;