// Main file in the SERVER 
import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import ErrorHandler from "./MiddleWare/route-not-found";
import userController from "./Routes/userController"
import vacationController from "./Routes/vacationController"
import followingController from "./Routes/followingController"
import authController from "./Routes/auth-controller"
import config from "./Utils/config";
import catchAll from "./MiddleWare/catch-all";
import building_DB_Tables from "./Utils/init_mysql"
import sanitize from "./MiddleWare/sanitize";

const server = express();
const currentPort = config.port;
building_DB_Tables();

server.use(expressRateLimit({ windowMs: 1000, max: 50, message:"What are you try to do?!"}));

var corsOptions = {
    "origin": "*", //expose to all server around the world
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //expose which methods are allowed
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "exposedHeaders" : "Authorization" //expose the Authorization header
  }

server.use(cors(corsOptions));
server.use(fileUpload());
server.use(express.json());
server.use(sanitize)

server.use("/users", userController);
server.use("/vacations", vacationController);
server.use("/following", followingController);
server.use("/auth", authController);

server.use("*", ErrorHandler);
server.use(catchAll);
server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )