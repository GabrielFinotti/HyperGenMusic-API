export interface UserData {
  username: string;
  email: string;
  password: string;
  phone?: string;
  imageUrl?: string;
  role: "user" | "admin" | "dev";
}
