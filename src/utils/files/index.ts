/**
 * Utilitários para manipulação de arquivos
 */
import { deleteFile } from "./deleteFile";
import { fileTypes, getFileExtension } from "./fileExtension";
import { replaceImage } from "./replaceImage";
import { setupDirectories, cleanDirectories } from "./directories";

export const fileService = {
  deleteFileIfExists: deleteFile,
  getFileExtension,
  mimeTypes: fileTypes,
  replaceImage,
  setupUploadDirectories: setupDirectories,
  cleanUploadDirectories: cleanDirectories,
};
