import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import databaseService from "../services/database.service";
import usersService from "../services/users.services";
import { validate } from "../utils/validation";
import { ErrorWithStatus } from "../models/Errors";
import USERS_MESSAGE from "../constants/message";
import User from "~/models/Schema/User.schema";

export const loginValidator = validate(
  checkSchema({
    email:{
      notEmpty:{
        errorMessage:USERS_MESSAGE.EMAIL_IS_REQUIRED
      },
      isEmail:{
        errorMessage:USERS_MESSAGE.EMAIL_IS_INVALID
      },
      trim:true,
      custom:{
        options:async (value,{req})=>{
          const user = await databaseService.users.findOne({email:value})
          if( user === null){
            throw new Error(USERS_MESSAGE.USER_NOT_FOUND)
          }
          req.user = user
          return true
  
        }
      }
    },
    password:{
      notEmpty:{
        errorMessage:USERS_MESSAGE.PASSWORD_IS_REQUIRED
      },
      isString:{
        errorMessage:USERS_MESSAGE.PASSWORD_MUST_BE_A_STRING
      },
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
        errorMessage: USERS_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
      }
    },
    confirm_password:{
      notEmpty:{
        errorMessage:USERS_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
      },
     isString:{
      errorMessage:USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
     },
      isLength:{
        errorMessage:USERS_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
      },
      custom:{
        options:(value,{req})=>{
          if(value !== req.body.password){
            throw new Error(USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_SAME_PASSWORD)
          }
          return true
        }
      }
    },
  })
)


export const registerValidator = validate(checkSchema({
  name:{
    notEmpty:{
      errorMessage:USERS_MESSAGE.NAME_IS_REQUIRE
    },
    isString:{errorMessage:USERS_MESSAGE.NAME_MUST_BE_A_STRING},
    isLength:{
     errorMessage:USERS_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_100
    },
    trim:true
  },
  email:{
    notEmpty:{
      errorMessage:USERS_MESSAGE.EMAIL_IS_REQUIRED
    },
    isEmail:{
      errorMessage:USERS_MESSAGE.EMAIL_IS_INVALID
    },
    trim:true,
    custom:{
      options:async (value)=>{
        const emailExist = usersService.checkEmailExist(value)
        if(await emailExist){
          throw new ErrorWithStatus({message:USERS_MESSAGE.EMAIL_IS_INVALID,status:400})
        }
        return true

      }
    }
  },
  password:{
    notEmpty:{
      errorMessage:USERS_MESSAGE.PASSWORD_IS_REQUIRED
    },
    isString:{
      errorMessage:USERS_MESSAGE.PASSWORD_MUST_BE_A_STRING
    },
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
      errorMessage: USERS_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    }
  },
  confirm_password:{
    notEmpty:{
      errorMessage:USERS_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
    },
   isString:{
    errorMessage:USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
   },
    isLength:{
      
      errorMessage:USERS_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    
    custom:{
      options:(value,{req})=>{
        if(value !== req.body.password){
          throw new Error(USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_SAME_PASSWORD)
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
      },
     errorMessage:USERS_MESSAGE.DATE_OF_BIRTH_MUST_BE_ISO8601
    }
  },

}))