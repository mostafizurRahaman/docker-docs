import express, { Application } from "express";
import cors from "cors";
import { configs } from "./app/configs";
import globalErrorHandler from "./middlewares/global-error-handler";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
   res.send(`Docker Docs server is running on port ${configs.port}`);
});

app.get('/err', async(req, res, next) =>{
    try {
      throw new Error('This is not only a forced error but also a cretical error!')
    } catch (error) {
      console.log(error)
      next(error)      
    }
})

app.use(globalErrorHandler);

export default app;
