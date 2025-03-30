import {
  DefaultResponseFunction,
  DefaultResponseResult,
} from "../../../types/handling/defaultReponse";

const defaultResponseImpl: DefaultResponseFunction = (
  isSuccess: boolean,
  statusCode: number,
  message?: string | string[],
  data?: any
): DefaultResponseResult => {
  return {
    isSuccess,
    statusCode,
    message,
    data,
  };
};

export default defaultResponseImpl;
