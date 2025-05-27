import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { logger } from "../utils/logger";
import { TUserDocument } from "../types/user.type";

const userSchema = new mongoose.Schema<TUserDocument>({
  district: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  lastLogin:{ type:Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
    
  } catch (error: any) {
    logger.error(error);  
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

const UserModel = mongoose.model<TUserDocument>('User', userSchema);
export default UserModel;