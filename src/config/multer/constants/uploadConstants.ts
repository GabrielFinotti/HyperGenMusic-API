import path from "path";

export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const UPLOAD_BASE_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "uploads"
);
export const IMAGES_DIR = path.join(UPLOAD_BASE_DIR, "images");
export const MUSICS_DIR = path.join(UPLOAD_BASE_DIR, "musics");

export const ALLOWED_MIMES = {
  images: ["image/png"],
  musics: ["video/mp4", "audio/mp4"],
};
