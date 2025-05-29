import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../../config/storage/cloudflare_r2";
import dotenv from "dotenv";

dotenv.config();

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
