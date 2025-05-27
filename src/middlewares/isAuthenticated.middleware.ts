import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config/config";
import { logger } from "../utils/logger";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'user not authorized'
      });

      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
    
    if (!decoded) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid token'
      });

      return;
    }

    req.userId = decoded.id;

    next();

} catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Token expired'
      });
      return;
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid token'
      });
      return;
    }

    logger.error('Authentication error:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Authentication failed'
    });
  }
}

export default isAuthenticated;