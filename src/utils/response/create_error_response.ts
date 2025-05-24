import { ResponseError } from "../../types";

const createErrorResponse = (message: string, errorCode: number): ResponseError => {
  return {
    success: false,
    message,
    errorCode,
  };
};

export default createErrorResponse;
