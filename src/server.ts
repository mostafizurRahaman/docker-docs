import app from "./app";
import { configs } from "./app/configs";

const main = async () => {
   app.listen(configs.port, () => {
      console.log(`Server is running on port ${configs.port}`);
   });
};

main();
