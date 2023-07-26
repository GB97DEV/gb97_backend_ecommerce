import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { ERRORS, Gb97Error } from '@/infrastructure/ErrorEnum'; 
import { deleteUser } from './../../service/UserService';

const handler = async (event, context) => {
  try {
    return deleteUser(event, context);
  } catch (err) {
    if (err.code && ERRORS[err.code]) {
      const error = ERRORS[err.code];
      throw new Gb97Error(error, error.message);
    }
    throw err;
  }
};

export const main = middy(handler).use(httpErrorHandler());
