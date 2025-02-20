export interface UserInterface {
  username: string;
  email: string;
  password: string;
  imageUrl?: string;
  role: "user" | "admin";
}
