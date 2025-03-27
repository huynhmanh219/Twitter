import { Request, Response } from "express";
import User from "~/models/Schema/User.schema";
import databaseService from "~/services/database.service";

export const loginController = (req: Request, res: Response) => {
  const {email,password} = req.body
   
  res.status(200).json({message:"Login success"})
}

export const registerController = (req: Request, res: Response) => {
  try{
    const {email,password} = req.body
  databaseService.users.insertOne(new User({email,password}))
  res.status(200).json({message:"Register success"})}
  catch(error){
    res.status(400).json({error:'register failed'})
  }
}