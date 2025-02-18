export interface UserInterface {
  username: string;
  email: string;
  passwrord: string;
  imageUrl?: string;
  role: "user" | "admin";
}
