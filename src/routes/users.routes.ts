import { NextFunction, Request, Response, Router } from "express";
import { loginController, registerController } from "../controllers/users.controller";
import { loginValidator, registerValidator } from "../middleware/users.middleware";
import { wrapRequestHandler } from "../utils/handlers";

const usersRouter = Router();

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController));
usersRouter.post('/register',registerValidator,wrapRequestHandler(registerController))
export default usersRouter
