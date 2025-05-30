import { Request, Response } from "express";
import UserModel from "../models/user.model";
import httpStatus from "http-status"; 
import { logger } from "../utils/logger";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { district, role, password } = req.body;

    const userExist = await UserModel.findOne({ district });
    
    if (userExist) {
      res.status(httpStatus.CONFLICT).json({ 
        success: false,
        message: 'User already exists' 
      });
      return;
    }
     
    const user = new UserModel({ 
      district, 
      role,
      password 
    });
    await user.save();

    res.status(httpStatus.CREATED).json({ 
      success: true,
      message: 'User registered successfully', 
    });

  } catch (error: any) {
    logger.error(error.message);
    
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
}

export const userLoginHandler = async (req: Request, res: Response) => {
 try {
  const { district, password } = req.body;

  const user = await UserModel.findOne({ district });

  if (!user) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid username or Password'
    });
    return;
  }

  const compare = await user?.comparePassword(password)
  if (!compare) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid username or Password'
    });
    return;
  }

  // Sign JWT with user ID and role
  const signUser = jwt.sign(
    { id: user._id, role: user.role }, 
    config.jwtSecret as string, 
    { expiresIn: '1d' }
  );

  // Set JWT in HTTP-only cookie
  res.cookie('token', signUser, {
    httpOnly: true,
    secure: config.environment === 'production'? true : false,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  user.lastLogin = new Date();
  await user.save();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'User logged in successfully',
    user: {
      id: user._id,
      district: user.district,
      role: user.role
    }
  });
  
 } catch (error) {
    logger.error({
      message: error,
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });  
 } 
}

export const userLogoutHandler = async (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(httpStatus.OK).json({
    success: true,
    message: 'User logged out successfully'
  });
} 

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    return res.status(httpStatus.OK).json({
      success: true,
      message: 'Users fetched successfully',
      users
    });
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
}
