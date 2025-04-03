import express, { NextFunction, Request, Response } from "express";
import  databaseService  from "./services/database.service";
import usersRouter from "./routes/users.routes";
import { defaultErrorHandler } from "./middleware/error.middleware";
const app = express();
const port =process.env.PORT || 3005;
databaseService.connect();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user",usersRouter)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
});