import multer from "multer";
import { baseConfig, allTypesFilter } from "./uploadConfigs";
import { createFileFilter } from "../../../utils/multer/fileHandlers";
import { ALLOWED_MIMES } from "../constants/uploadConstants";

const multerConfig = multer({
  ...baseConfig,
  fileFilter: allTypesFilter,
});

export const uploadImage = multer({
  ...baseConfig,
  fileFilter: createFileFilter(ALLOWED_MIMES.images),
});

export const uploadMusic = multer({
  ...baseConfig,
  fileFilter: createFileFilter(ALLOWED_MIMES.musics),
});

export default multerConfig;
