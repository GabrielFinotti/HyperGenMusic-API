import { Request } from "express";
import multer from "multer";
import crypto from "crypto";
import setupUploadDirectories from "../../utils/uploads/folderSync";

const mimeTypes = {
  image: {
    "image/png": ".png",
    "image/jpeg": ".jpg",
  },
  music: {
    "audio/mpeg": ".mp3",
    "audio/wav": ".wav",
    "audio/ogg": ".ogg",
  },
};

const fileSizeLimits = {
  image: 20 * 1024 * 1024,
  music: 400 * 1024 * 1024,
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const { imagesDir, songsDir } = await setupUploadDirectories();

      if (Object.keys(mimeTypes.image).includes(file.mimetype)) {
        cb(null, imagesDir);
      } else if (Object.keys(mimeTypes.music).includes(file.mimetype)) {
        cb(null, songsDir);
      } else {
        cb(new Error(`Tipo de arquivo não suportado: ${file.mimetype}`), "");
      }
    } catch (error) {
      cb(error as Error, "");
    }
  },
  filename: (req, file, cb) => {
    const fileHash = crypto.randomBytes(16).toString("hex");
    const fileExt = getFileExtension(file.mimetype);
    const fileName = `${fileHash}${fileExt}`;

    cb(null, fileName);
  },
});

function getFileExtension(mimetype: string): string {
  if (Object.keys(mimeTypes.image).includes(mimetype)) {
    return mimeTypes.image[mimetype as keyof typeof mimeTypes.image];
  }
  if (Object.keys(mimeTypes.music).includes(mimetype)) {
    return mimeTypes.music[mimetype as keyof typeof mimeTypes.music];
  }
  return ".tmp";
}

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const isValidImage = Object.keys(mimeTypes.image).includes(file.mimetype);
  const isValidMusic = Object.keys(mimeTypes.music).includes(file.mimetype);

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

const limits = {
  fileSize: Math.max(fileSizeLimits.image, fileSizeLimits.music),
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

export default upload;
