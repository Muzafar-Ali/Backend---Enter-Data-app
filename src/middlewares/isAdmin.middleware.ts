import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided',
      });

      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    if (decoded.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access only',
      });

      return;
    }

    next();

  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });

    return;
  }
};

export default isAdmin;
