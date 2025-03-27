import { Request, Response } from "express";
import User from "~/models/Schema/User.schema";
import {ParamsDictionary} from "express-serve-static-core";
import databaseService from "~/services/database.service";
import usersService from "~/services/users.services";
import { RegisterRequestBody } from "~/models/requests/User.requests";

export const loginController = async (req: Request, res: Response) => {
  try{

  }
  catch(error){
      res.status(400).json({error:'Login failed'})
    }
  }

export const registerController = async (req: Request<ParamsDictionary,any, RegisterRequestBody>, res: Response) => {
  try{
    const result =  await usersService.register(req.body)
    res.status(200).json({
      message:"Register success",
      result
    })
    return;
  } catch(error)
  {
    res.status(500).json(error)
  }
}