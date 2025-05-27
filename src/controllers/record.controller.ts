import { Request, Response } from "express";
import httpStatus from "http-status";
import { RecordInputType, recordSchema } from "../schema/record.schema";
import RecordModel from "../models/record.model";
import { logger } from "../utils/logger";

export const createRecordHandler = async ( req: Request<{}, {}, RecordInputType["body"]>, res: Response) => { 
  try {
    const userId = req.userId;
    console.log('userId', userId);
    console.log(req.body);
    
    
    const result = recordSchema.safeParse({ body: req.body });
  
    if (!result.success) {
      const errorMessages = result.error?.issues.map((issue) => issue.message).join(', ');

      logger.error({
        message: errorMessages,
        path: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: errorMessages
      });
      return; 
    }
    
    const data = new RecordModel({
      ...result.data.body,
      user: userId
    })
    await data.save();
    
    res.status(httpStatus.CREATED).json({
      success: true,
      // data
    });
    
  } catch (error: any) {
    logger.error({
      message: error,
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
  
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
