export type DefaultResponseResult<T = any> = {
  isSuccess: boolean;
  statusCode: number;
  message?: string | string[];
  data?: T;
};

export type DefaultResponseFunction = {
  <T = any>(
    isSuccess: boolean,
    statusCode: number,
    message?: string | string[],
    data?: T
  ): DefaultResponseResult;
};
