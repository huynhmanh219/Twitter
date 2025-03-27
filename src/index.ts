import express from "express";
import  databaseService  from "./services/database.service";
import usersRouter from "./routes/users.routes";
const app = express();
const port =process.env.PORT || 3005;
databaseService.connect();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user",usersRouter)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
});