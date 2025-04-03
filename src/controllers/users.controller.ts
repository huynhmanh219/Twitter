import { NextFunction, Request, Response } from "express";
import User from "../models/Schema/User.schema";
import {ParamsDictionary} from "express-serve-static-core";
import databaseService from "../services/database.service";
import usersService from "../services/users.services";
import { RegisterRequestBody } from "../models/requests/User.requests";
import { ObjectId } from "mongodb";
import USERS_MESSAGE from "../constants/message";

export const loginController = async (req: Request, res: Response) => {
    const user = req.user as User
    const user_id = user._id as ObjectId
    const result = await usersService.login(user_id.toString())
    
    res.json({
      message:USERS_MESSAGE.LOGIN_SUCCESS,
      result})
  }
export const registerController = async (req: Request<ParamsDictionary,any, RegisterRequestBody>, res: Response,next:NextFunction) => {
    
    const result =  await usersService.register(req.body)
    res.status(200).json({
      message:USERS_MESSAGE.REGISTER_SUCCESS,
      result
    })
    return;
}