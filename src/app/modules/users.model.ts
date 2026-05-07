import { model, Schema } from "mongoose";
import { IUserDoc, ROLES, roleValues } from "./users.interface";

export const userSchema = new Schema<IUserDoc>(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         unique: true,
         required: true,
      },
      role: {
         type: String,
         enum: roleValues,
         required: true,
         default: ROLES.USER,
      },
   },
   {
      timestamps: true,
      versionKey: false,
   },
);

export const User = model<IUserDoc>("User", userSchema);
