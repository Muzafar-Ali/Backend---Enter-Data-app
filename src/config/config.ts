import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  mongoURI: process.env.MONGODB_URI,
  nodeEnv: process.env.ENV_NODE,
  corsOrigin: process.env.CLIENT_URL,
  saltWorkFactor: process.env.SALT_FACTOR,
  environment: process.env.ENVIRONMENT,
  jwtSecret: process.env.JWT_SECRET
}

export default config;