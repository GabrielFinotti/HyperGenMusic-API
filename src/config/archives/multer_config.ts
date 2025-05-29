import multer from "multer";
import multerS3 from "multer-s3";
import s3Client from "../storage/cloudflare_r2";
import crypto from "crypto";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

const multerConfig = {
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME as string,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,

    key: (req: Request, file: Express.Multer.File, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),

  limits: {
    fileSize: 300 * 1024 * 1024,
  },

  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "audio/mpeg",
      "audio/mp3",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};

export default multer(multerConfig);
