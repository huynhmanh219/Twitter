import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    const {email,password}= req.body
    if(!email || !password){
      res.status(401).json({message:"Email and password are required"})
    }
      next()
}
export const registerValidator = checkSchema({
  name:{
    notEmpty:true,
    isString:true,
    isLength:{
      options:{
        min:1,
        max:100
      }
    },
    trim:true
  },
  email:{
    notEmpty:true,
    isEmail:true,
    trim:true
  },
  password:{
    notEmpty:true,
    isString:true,
    isLength:{
      options:{
        min:6,
        max:50
      }
    },
    isStrongPassword:{
      options:{
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
      }
    }
  },
  confirm_password:{
    notEmpty:true,
  },
  date_of_birth:{
    isISO8601:{
      options:{
        strict:true,
        strictSeparator:true
      }
    }
    
  }
})