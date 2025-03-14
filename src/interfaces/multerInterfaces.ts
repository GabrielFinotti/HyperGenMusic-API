import multer from "multer";

export type FileDestination = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void
) => void;

export type FileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => void;
