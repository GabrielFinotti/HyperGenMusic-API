import { Request } from "express";
import multer from "multer";
import crypto from "crypto";
import { folderUtils } from "../../utils";

const fileSizeLimits = {
  image: 20 * 1024 * 1024,
  music: 400 * 1024 * 1024,
};

const storage = multer.diskStorage({
  destination: async (_, file, cb) => {
    try {
      const { imagesDir, songsDir } =
        await folderUtils.setupUploadDirectories();

      if (Object.keys(folderUtils.mimeTypes.image).includes(file.mimetype)) {
        cb(null, imagesDir);
      } else if (
        Object.keys(folderUtils.mimeTypes.music).includes(file.mimetype)
      ) {
        cb(null, songsDir);
      } else {
        cb(new Error(`Tipo de arquivo não suportado: ${file.mimetype}`), "");
      }
    } catch (error) {
      cb(error as Error, "");
    }
  },
  filename: (_, file, cb) => {
    const fileHash = crypto.randomBytes(16).toString("hex");
    const fileExt = folderUtils.getFileExtension(file.mimetype);
    const fileName = `${fileHash}${fileExt}`;

    cb(null, fileName);
  },
});

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const isValidImage = Object.keys(folderUtils.mimeTypes.image).includes(
    file.mimetype
  );
  const isValidMusic = Object.keys(folderUtils.mimeTypes.music).includes(
    file.mimetype
  );

  if (isValidImage || isValidMusic) {
    const fieldName = file.fieldname;

    if (
      (fieldName === "image" && !isValidImage) ||
      (fieldName === "music" && !isValidMusic)
    ) {
      cb(new Error(`Tipo de arquivo inválido para o campo ${fieldName}`));
      return;
    }

    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo não suportado: ${file.mimetype}`));
  }
};

const multiUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: Math.max(fileSizeLimits.image, fileSizeLimits.music) },
});

export default multiUpload;
