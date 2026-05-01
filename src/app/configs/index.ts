import dotenv from "dotenv";
import path from "path";

dotenv.config({
   path: path.join(process.cwd(), ".env"),
});

export const configs = {
   port: process.env.PORT || 5000,
   nodeEnv: process.env.NODE_ENV || "development",
};
