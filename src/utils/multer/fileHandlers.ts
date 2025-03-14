import path from "path";
import crypto from "crypto";
import { FileDestination, FileFilter } from "../../interfaces/multerInterfaces";
import {
  IMAGES_DIR,
  MUSICS_DIR,
} from "../../config/multer/constants/uploadConstants";

export const getDestination: FileDestination = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, IMAGES_DIR);
  } else if (file.mimetype.includes("mp4")) {
    cb(null, MUSICS_DIR);
  } else {
    cb(new Error("Tipo de arquivo não suportado"), "");
  }
};

export const generateFilename = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void
) => {
  crypto.randomBytes(16, (err, hash) => {
    if (err) {
      cb(err, "");
      return;
    }

    const fileExt = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, fileExt)
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase();
    const fileName = `${hash
      .toString("hex")
      .substring(0, 8)}-${baseName}${fileExt}`;

    cb(null, fileName);
  });
};

export const createFileFilter = (allowedTypes: string[]): FileFilter => {
  return (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Formato de arquivo inválido. Apenas ${allowedTypes.join(
            ", "
          )} são permitidos.`
        )
      );
    }
  };
};
