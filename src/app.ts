import express from 'express';
import config from './config/config';
import helmet from 'helmet';
import cors from 'cors'
import recordRoutes from './routes/record.routes';
import userRoutes from './routes/user.route';
import connectDB from './config/connectDB';
import { logger } from './utils/logger';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Home route
app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);

// 404 Not Found error handler middleware
app.use((req, res) => {
  logger.error({
    message: 'Resource not found',
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  });

  res.status(404).json({
    success: false,
    message: 'Resource not found',
    error: {
      statusCode: 404,
      message: 'The requested resource could not be found on this server'
    }
  });
});

app.listen(config.port, async () => {
  await connectDB();
  console.log(`Server is running on port ${config.port}`);
});