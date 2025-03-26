export const mimeTypes = {
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

function getFileExtension(mimetype: string): string {
  if (Object.keys(mimeTypes.image).includes(mimetype)) {
    return mimeTypes.image[mimetype as keyof typeof mimeTypes.image];
  }
  if (Object.keys(mimeTypes.music).includes(mimetype)) {
    return mimeTypes.music[mimetype as keyof typeof mimeTypes.music];
  }
  return ".tmp";
}

export default getFileExtension;
