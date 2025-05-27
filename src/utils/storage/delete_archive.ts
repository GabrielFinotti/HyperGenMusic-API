/**
 * Utilitário de Remoção de Arquivos - HyperGenMusic API v2.0
 *
 * Fornece funcionalidade para remoção segura de arquivos do
 * Cloudflare R2, extraindo chaves de objeto de URLs e executando
 * a operação de delete via SDK da AWS.
 *
 * Funcionalidades:
 * - Extração automática de chave de objeto da URL
 * - Suporte a diferentes formatos de URL
 * - Validação de parâmetros de entrada
 * - Tratamento de erros de operação
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../../config/storage/cloudflare_r2";
import dotenv from "dotenv";

dotenv.config();

/**
 * Remove um arquivo do bucket Cloudflare R2
 *
 * Extrai a chave do objeto da URL fornecida e executa a operação
 * de remoção no bucket configurado. Suporta diferentes formatos
 * de URL do Cloudflare R2.
 *
 * @param archiveUrl - URL completa do arquivo a ser removido
 * @throws Erro se não conseguir extrair a chave ou falhar na remoção
 *
 * @example
 * ```typescript
 * await deleteArchiveForBucket('https://pub-xxx.r2.dev/hash-file.mp3');
 * ```
 */
const deleteArchiveForBucket = async (archiveUrl: string) => {
  try {
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME as string;

    let objectKey = "";

    // Extrai chave do objeto baseado no formato da URL
    if (archiveUrl.includes(bucketName + "/")) {
      objectKey = archiveUrl.substring(
        archiveUrl.indexOf(bucketName + "/") + bucketName.length + 1
      );
    } else {
      const url = new URL(archiveUrl);

      objectKey = url.pathname.startsWith("/")
        ? url.pathname.substring(1)
        : url.pathname;
    }

    if (!objectKey) {
      throw new Error("Not possible to extract object key from URL");
    }

    const deleteParams = {
      Bucket: bucketName,
      Key: objectKey,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    throw error;
  }
};

export default deleteArchiveForBucket;
