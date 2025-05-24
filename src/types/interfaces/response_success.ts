export interface ResponseSuccess<T> {
  success: true;
  message: string;
  data: T | null;
  statusCode: number;
}
