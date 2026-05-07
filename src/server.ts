import { config } from "dotenv";
import app from "./app";
import { configs } from "./app/configs";
import { connectDB } from "./app/libs/connect-mongoose";

const main = async () => {
   try {
      await connectDB(configs.dbURL as string);
      
      app.listen(configs.port, () => {
         console.log(`Docker docs is running on port ${configs.port}`);
      });
   } catch (error) {
      console.log(`Failed to connect db!`);
   }
};

main();
