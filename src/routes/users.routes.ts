import { Router } from "express";
import { loginController, registerController } from "~/controllers/users.controller";
import { loginValidator } from "~/middleware/users.middleware";

const usersRouter = Router();

usersRouter.post('/login',loginValidator,loginController)
usersRouter.post('/register',registerController)
export default usersRouter