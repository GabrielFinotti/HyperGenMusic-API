/**
 * Configuração Multer - HyperMusic API v2.0
 *
 * Configura o middleware Multer para upload de arquivos diretamente
 * para Cloudflare R2, incluindo validação de tipos, geração de nomes
 * únicos e limitação de tamanho para segurança.
 *
 * Funcionalidades:
 * - Upload direto para Cloudflare R2 via multer-s3
 * - Geração de nomes únicos com crypto.randomBytes
 * - Validação de tipos MIME (imagens e áudio)
 * - Limite de 300MB por arquivo
 * - ACL público para acesso direto
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import multer from "multer";
import multerS3 from "multer-s3";
import s3Client from "../storage/cloudflare_r2";
import crypto from "crypto";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

/**
 * Configuração do Multer para Cloudflare R2
 *
 * Define storage S3-compatível, validações de arquivo
 * e geração de nomes únicos para evitar conflitos.
 */
const multerConfig = {
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME as string,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    /**
     * Gera nome único para o arquivo usando hash criptográfico
     * @param req - Request do Express
     * @param file - Arquivo sendo enviado
     * @param cb - Callback para retorno do nome
     */
    key: (req: Request, file: Express.Multer.File, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  /** Limite de 300MB por arquivo */
  limits: {
    fileSize: 300 * 1024 * 1024,
  },
  /**
   * Filtro de validação de tipos de arquivo
   * Aceita apenas imagens (JPEG, PNG) e áudio (MP3)
   */
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
