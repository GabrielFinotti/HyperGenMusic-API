import { ResponseSuccess } from "../../types";

const createSuccessResponse = <T>(
  message: string,
  data: T | null,
  statusCode: number
): ResponseSuccess<T> => {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
};

export default createSuccessResponse;
