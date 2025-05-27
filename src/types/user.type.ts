import { Document } from "mongoose";

export type TUser = {
  district: string;
  password: string;
  role: 'admin' | 'user';
  lastLogin: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export type TUserDocument = TUser & Document;