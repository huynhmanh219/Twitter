import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import databaseService from "~/services/database.service";
import usersService from "~/services/users.services";
import { validate } from "~/utils/validation";

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    const {email,password}= req.body
    if(!email || !password){
      res.status(401).json({message:"Email and password are required"})
    }
      next()
}
export const registerValidator = validate(checkSchema({
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
    trim:true,
    custom:{
      options:async (value)=>{
        const emailExist = usersService.checkEmailExist(value)
        if(await emailExist){
          throw new Error("Email already exists")
        }
        return true

      }
    }
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
      },
      errorMessage:"Password must be at least 6 characters long, and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol"
    }
  },
  confirm_password:{
    notEmpty:true,
   isString:true,
    isLength:{
      options:{
        min:6,
        max:50
      }
    },
    custom:{
      options:(value,{req})=>{
        if(value !== req.body.password){
          throw new Error("Password must not be the same as confirm password")
        }
        return true
      }
    }
  },
  date_of_birth:{
    isISO8601:{
      options:{
        strict:true,
        strictSeparator:true
      }
    }
  },

}))