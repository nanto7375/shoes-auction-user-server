import axios, { AxiosRequestConfig } from 'axios';
import logger from '../config/log.config';
import ErrorException from '../exceptions/form.exception';
import ExceptionAttribute from '../exceptions/attribute.exception';

interface Options {
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: Record<string, unknown>;
    params?: Record<string, unknown>;
}

const FetchEx = async ( url: string, options?: Options ) => {
  const axiosOptions: AxiosRequestConfig = {
    url,
    method: options?.method || 'GET',
    headers: options?.headers,
    data: options?.body,
    params: options?.params,
  };
  logger.info({ request: axiosOptions });
  try {
    const res = await axios( axiosOptions );
    return res.data.resultMessage;
  } catch ( error ) {
    logger.error({ stack: error.stack });
    const { status } = error.response;
    const { resultCode, resultMessage } = error.response.data;
    throw new ErrorException( new ExceptionAttribute( status, resultCode, resultMessage ) );
  }
};

export default FetchEx;
