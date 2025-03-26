export interface UserResult {
  success: boolean;
  message?: string;
  token?: string;
  user?: any;
  errors?: string[];
  statusCode: number;
}
