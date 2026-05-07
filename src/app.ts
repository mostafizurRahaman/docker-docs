import express, { Application } from "express";
import cors from "cors";
import { configs } from "./app/configs";
import globalErrorHandler from "./middlewares/global-error-handler";
import { User } from "./app/modules/users.model";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
   res.send(`Docker Docs server is running on port ${configs.port}`);
});

app.get("/todos", async (req, res) => {
   const result = await fetch(`https://jsonplaceholder.typicode.com/todos`);
   const response = await result.json();

   res.json(response);
});

app.get("/user", async (req, res) => {
   // insert first data into database
   const user = await User.findOne({
      email: "mostafiz@gmail.com",
   });

   if (!user) {
      const newUser = await User.create({
         name: "Mostafizur Rahaman",
         email: "mostafiz@gmail.com",
         role: "SUPER_ADMIN",
      });

      return res.json(newUser);
   }

   return res.json(user);
});

app.get("/err", async (req, res, next) => {
   try {
      throw new Error(
         "This is not only a forced error but also a cretical error!",
      );
   } catch (error) {
      console.log(error);
      next(error);
   }
});

app.use(globalErrorHandler);

export default app;
