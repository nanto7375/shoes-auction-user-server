import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { isCelebrateError } from 'celebrate';

import envConfig from './config/env.config';
import logger from './config/log.config';
import router from './routes/index.route';

import { resError } from './utils/handler';
import MyBasicException from './exceptions/my/my-basic.exception';
import ErrorException from './exceptions/form.exception';
import { notFoundRoute, badData } from './exceptions/my/my-definition.exception';

import { checkDbConnection } from './models/index.model';

const app: express.Application = express();

const { port } = envConfig;

// health check end point
app.use( '/actuator/health', ( req: Request, res: Response ) => {
  res.send({ resultCode: 0, resultMessage: 'OK' }); 
});

// middleware
app.use( express.json({ limit: '50mb' }) );
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 1000000,
  })
);

// cors
const corsOptions: cors.CorsOptions = {   
  credentials: true,
  methods: [ 'GET','POST','PUT','DELETE','PATCH' ],
  preflightContinue: false,
};
app.use( cors( corsOptions ) );

// incoming log
app.use( ({ hostname, ip, method, url, headers, body }: Request, res: Response, next: NextFunction ) => {
  logger.info({ hostname, ip, method, url, headers, body });
  next();
});

// service router
app.use( router );

// server on
app.listen( port , async () => {
  logger.info({ serverStart : `[SERVER] User server start on port ${port}` });
  await checkDbConnection();
});

// Unknown route error
app.use( ( req: Request, res: Response ) => {
  try {
    throw new ErrorException( notFoundRoute, `Not found route=${req.url}` );
  } catch ( error ) {
    resError( res, error );
  }
});

// celebrate exception
app.use( ( error: MyBasicException, req: Request, res: Response, next: NextFunction ) => {
  if ( !isCelebrateError( error ) ) {
    return next( error );
  }
  throw new ErrorException( badData );
});

// exception middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use( ( error: MyBasicException, req: Request, res: Response, next: NextFunction ) => {
  resError( res, error );
});
