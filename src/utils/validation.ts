import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult, ContextRunner, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema';
// can be reused by many routes

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped()})
      return;
    }
     next();
  };
};

// app.post('/signup', validate([
//   body('email').isEmail(),
//   body('password').isLength({ min: 6 })
// ]), async (req:Request, res:Response, next:NextFunction) => {
//   // request is guaranteed to not have any validation errors.
//   const user = await User.create({ ... });
// });