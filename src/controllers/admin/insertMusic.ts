import { Request, Response } from "express";
import { regexGroup } from "../../utils/auth/regex";
import Music from "../../models/musicModel";

export const insertMusic = async (req: Request, res: Response) => {
  try {
    const musicData = req.body;

    console.log(musicData);

    // if (!musicData.duration || !musicData.songUrl || !musicData.title) {
    //   res.status(400).send({ message: "Dados obrigatórios incompletos" });
    //   return;
    // }

    // if (musicData.duration < 0) {
    //   res.status(400).send({ message: "Duração não pode ser negativa" });
    //   return;
    // }

    // if (!regexGroup.url.test(musicData.songUrl)) {
    //   res.status(400).send({ message: "URL da música inválida" });
    //   return;
    // }

    // if (musicData.imageUrl && !regexGroup.url.test(musicData.imageUrl)) {
    //   res.status(400).send({ message: "URL da imagem inválida" });
    //   return;
    // }

    // const newMusic = await Music.create(musicData);

    res.status(201).send({
      message: "Música cadastrada com sucesso",
      // music: newMusic.toApiFormat(),
    });
  } catch (error) {
    console.error(`Erro durante a inserção da música: ${error}`.red.bgBlack);
    res.status(500).send({ message: "Erro durante a inserção da música" });
  }
};
