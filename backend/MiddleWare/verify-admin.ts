import { Request, Response, NextFunction } from "express";
import jwtHelper from "../Utils/jwt-helper";
import { ClientError } from "../Models/client-errors";
import Role from "../Models/role";


const verifyAdmin = (request:Request, response:Response, next: NextFunction):void => {

    const authorizationHeader = request.header("authorization");
    
    const user = jwtHelper.getUserFromToken(authorizationHeader);
    
    if(user.role !== Role.Admin) {
        next(new ClientError(403,"You must be an admin"));
        return;
    }
    next();
}

export default verifyAdmin;