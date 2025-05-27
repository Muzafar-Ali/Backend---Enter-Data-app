import winston from 'winston';
import 'winston-mongodb';
import config from '../config/config.js';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let msg = `${timestamp} ${level}: ${message}\n`;
  if (stack) {
    msg += `Stack: ${stack}\n`;
  }
  if (metadata.metadata && Object.keys(metadata.metadata).length > 0) {
    msg += `Metadata: ${JSON.stringify(metadata, null, 2)}\n`;
  }
  return msg;
});

// Define format for console logs
function buildLogFormat() {
  return combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'stack'] }),
    logFormat
  );
}

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: buildLogFormat(),
  // Console transport
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat)
    }),
    
    // Error log database transport
    new winston.transports.MongoDB({
      level: 'warn', // Log level to store in MongoDB
      db: config.mongoURI as string, // MongoDB connection string
      options: { },
      collection: 'logs', // Collection name
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      metaKey: 'metadata', // Key under which metadata will be stored
      capped: true, // Use capped collection
      cappedSize: 10000000, // 10MB capped size
      cappedMax: 1000 // Max number of documents
    })
  ]
});

export { logger };