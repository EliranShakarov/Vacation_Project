import express, {NextFunction, Request, Response} from 'express';
import path from "path"
import vacationLogic from '../Logic/vacationLogic';
import Urls from '../Utils/urls';
import safeDelete from '../Utils/self-delete';
import verifyToken from '../MiddleWare/verify-token';
import verifyAdmin from '../MiddleWare/verify-admin';

const router = express.Router();

router.get(Urls.getAllVacationsURL, async (request: Request, response: Response, next: NextFunction) => {
  try{
      response.status(200).json(await vacationLogic.getAllVacations())
    }catch(err){
      next(err);
    }
})

router.get(Urls.getVacationByIdURL, async (request: Request, response: Response, next: NextFunction) => {
  try{  
    const id = +request.params.id;
    response.status(201).json(await vacationLogic.getVacationByID(id));
  }catch(err){
    next(err);
  }
})

router.get(Urls.getVacationsByNameURL, async (request: Request, response: Response, next: NextFunction) => {
  try{
    const name = request.params.name;
    response.status(201).json(await vacationLogic.getVacationsByName(name));
  }catch(err){
    next(err);
  }
})
  
router.get(Urls.getVacationImageURL, (request: Request, response: Response, next: NextFunction) => {
    const imageName = request.params.imageName;
    const fullPath = path.join(__dirname, "..", "images", imageName);
    response.sendFile(fullPath);
})

router.post(Urls.addNewVacationURL, [verifyToken, verifyAdmin] ,async (request: Request, response: Response, next: NextFunction) => {
  try{
    const newVacation = request.body;
    request.body.image = request.files?.image;
    response.status(201).json(await vacationLogic.addNewVacation(newVacation))
  }catch(err){
    next(err);
  }
})

router.put(Urls.updateVacationURL, [verifyToken, verifyAdmin] ,async (request: Request, response: Response, next: NextFunction) => {
  try{
    request.body.vacation_id = +request.params.id;
    request.body.image = request.files?.image;
    const vacation = request.body;
    response.status(201).json(await vacationLogic.updateVacation(vacation));
  }catch(err){
    next(err);
  }
})

router.post(Urls.deleteVacationURL, [verifyToken, verifyAdmin] ,async (request: Request, response: Response, next: NextFunction) => {
  try{
    const id = +request.params.id;
    const imageName = request.body.data.imageName;
    safeDelete("./images/" + imageName);
    response.status(204).json(await vacationLogic.deleteVacation(id))
  }catch(err){
    next(err);
  }
})


export default router;