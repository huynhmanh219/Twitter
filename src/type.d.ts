import { Request } from "express";
import User from "../models/Schema/User.schema";
declare module 'express'{
  export interface Request {
      user?:User
  }
}