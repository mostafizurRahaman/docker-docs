import { Document } from "mongoose";

export const ROLES = {
   ADMIN: "ADMIN",
   SUPER_ADMIN: "SUPER_ADMIN",
   USER: "USER",
} as const;

export type TRoleType = keyof typeof ROLES;

export const roleValues = Object.values(ROLES);

export interface IUser {
   name: string;
   email: string;
   role: TRoleType;
   createdAt: Date;
   updatedAt: Date;
}

export interface IUserDoc extends Document, IUser {}
