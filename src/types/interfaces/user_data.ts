export interface UserData {
  username: string;
  email: string;
  password: string;
  phone?: string;
  image?: Blob;
  role: "user" | "admin" | "dev";
}
