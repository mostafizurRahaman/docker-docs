import { NextFunction, RequestHandler } from "express";
import { userServices } from "./user.services";

const createUser = async (
   req: RequestHandler,
   res: Response,
   next: NextFunction,
) => {

   const result = await userServices.createUser(req.body)







};
