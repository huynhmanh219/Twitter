import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult, ContextRunner, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema';
import HTTP_STATUS from '../constants/httpStatus';
import { EntityError, ErrorWithStatus } from '../models/Errors';
// can be reused by many routes

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req);
    const errors = validationResult(req);
    const errorsObject = errors.mapped();
    const entityError = new EntityError({ message: 'Validation failed', status: HTTP_STATUS.UNPROCESSABLE_ENTITY, errors: {} })
    for (const key in errorsObject) {
      const {msg} = errorsObject[key];
      if(msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY)
      {
        return next(msg)
      }
      entityError.errors[key] = errorsObject[key]
      
    }
    if (errors.isEmpty()) {
      return next();
    }
     next(entityError)
  };
};

// app.post('/signup', validate([
//   body('email').isEmail(),
//   body('password').isLength({ min: 6 })
// ]), async (req:Request, res:Response, next:NextFunction) => {
//   // request is guaranteed to not have any validation errors.
//   const user = await User.create({ ... });
// });