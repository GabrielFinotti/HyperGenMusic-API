import multer from "multer";
import {
  generateFilename,
  getDestination,
} from "../../../utils/multer/fileHandlers";
import { MAX_FILE_SIZE, ALLOWED_MIMES } from "../constants/uploadConstants";

const storage = multer.diskStorage({
  destination: getDestination,
  filename: generateFilename,
});

export const baseConfig: multer.Options = {
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
};

export const allTypesFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allAllowedTypes = [...ALLOWED_MIMES.images, ...ALLOWED_MIMES.musics];
  if (allAllowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Tipo de arquivo não suportado. Tipos permitidos: ${allAllowedTypes.join(
          ", "
        )}`
      )
    );
  }
};
