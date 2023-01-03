import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { isCelebrateError } from 'celebrate';

import envConfig from './config/env.config';
import logger from './config/log.config';
import router from './routes/index.route';

import { resError } from './utils/handler';
import ErrorException from './exceptions/form.exception';
import { notFoundRoute, badData } from './exceptions/definition.exception';

import { checkDbConnection } from './models/index.model';

const app: express.Application = express();

const { port } = envConfig;

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
app.use( ( req: Request, res: Response, next: NextFunction ) => {
  return next( new ErrorException( notFoundRoute ) );
});

// celebrate exception
app.use( ( error: ErrorException, req: Request, res: Response, next: NextFunction ) => {
  if ( !isCelebrateError( error ) ) {
    return next( error );
  }
  throw new ErrorException( badData );
});

// exception middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use( ( error: ErrorException, req: Request, res: Response, next: NextFunction ) => {
  resError( res, error );
});
