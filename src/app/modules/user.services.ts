import { Types } from "mongoose";
import { IUser, ROLES } from "./users.interface";
import { User } from "./users.model";

const createUser = async (payload: Record<string, any>) => {
   // 1. Destructure :
   const { name, email, role } = payload;

   const user = await User.create({
      name,
      email,
      role: ROLES.USER,
   });

   return user;
};

const getList = async () => {
   const users = await User.find({});

   return users;
};

const deleteOne = async (id: Types.ObjectId) => {
   const deletedUser = await User.findOneAndDelete(id);
   return deletedUser;
};

export const userServices = {
   createUser,
   getList,
   deleteOne,
};
