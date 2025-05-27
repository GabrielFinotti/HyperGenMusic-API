/**
 * Configuração Cloudflare R2 - HyperGenMusic API v2.0
 *
 * Configura o cliente S3 para Cloudflare R2, utilizado para
 * armazenamento de arquivos de música, imagens de capa e
 * avatares de usuário com alta disponibilidade e performance.
 *
 * Funcionalidades:
 * - Cliente S3 compatível com Cloudflare R2
 * - Configuração automática via variáveis de ambiente
 * - Região automática para otimização global
 * - Credenciais seguras via AWS SDK
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

/**
 * Cliente S3 configurado para Cloudflare R2
 *
 * Utiliza endpoint específico do R2 e região automática
 * para otimização de performance e latência global.
 */
const s3Client = new S3Client({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT as string,
  region: "auto",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY as string,
  },
});

export default s3Client;
