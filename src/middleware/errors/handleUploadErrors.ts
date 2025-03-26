import { Request } from "express";
import multer from "multer";

const handleUploadErrors = (err: Error, _: Request, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({
        error:
          "Arquivo muito grande. Limite para imagens: 20MB, para músicas: 400MB",
      });
      return;
    }
    res.status(400).json({ error: `Erro de upload: ${err.message}` });
    return;
  }

  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  next();
};

export default handleUploadErrors;
