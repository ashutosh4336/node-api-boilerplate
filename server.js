// @ts-nocheck
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import expressSession from 'express-session';
import morgan from 'morgan';

// Load ENV variable
dotenv.config({ path: `./src/config/config.env` });

// Import DB
import connectDB from './src/config/db.js';

// Middlewares
import { checkReqType, userAgentCheck } from './src/middlewares/userAgent.js';
import errorHandler from './src/middlewares/error.js';
import routeLoader from './src/middlewares/router.js';

const app = express();

app.use(express.json());

// ConnectDB
connectDB();

// CORS Middleware
const BaseUrl = {
  dev: 'http://127.0.0.1:3000',
  prod: 'https://yourdomain.com',
};

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? BaseUrl.prod : BaseUrl.dev,
  credentials: true,
};

// Logging Middleware
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

const isCookieSecure = process.env.NODE_ENV === 'production' ? true : false;

app.use(cors(corsOptions));
app.use(userAgentCheck);
app.use(checkReqType);

// All Router
routeLoader(app);

// Error Handler Middleware
app.use(errorHandler);

//Handle 404
// No Route Should Go Ubder this Block
app.use(function (req, res, next) {
  return res.status(404).json({
    success: false,
    code: 404,
    message: 'No Resource Found',
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `🚀 ` +
      colors.yellow.bold.underline(
        `Server started in ${process.env.NODE_ENV} on port ${PORT}`
      )
  );
});

// Handle Unhandled Rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(
    colors.red.underline(`💥️ ` + `Unhanled Rejection Error:  ${err?.message}`)
  );
  server.close(() => process.exit(1));
});

process.on('uncaughtException', function (err) {
  app.use(function (err, req, res, next) {
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Something Bad Happened... Please retry again later',
    });
  });
});

process.on('SIGTERM', function (code) {
  console.log(
    '🤯️ ' + colors.red.underline('SIGTERM received...'),
    process.pid,
    code
  );
  server.close(function () {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  if (server.listening) {
    server.close(function (err) {
      if (err) {
        console.error(`🤯️ ` + colors.red.underline(` SIGINT received...`));
        process.exit(1);
      }
      process.exit(0);
    });
  }
});

export default app;
