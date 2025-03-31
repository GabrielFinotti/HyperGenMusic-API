/**
 * Manipuladores de erros da aplicação
 */

import { AppError } from './AppError';
import { errorHandler } from './errorHandler';

export const errorHandling = {
  ...errorHandler,
  AppError,
};
