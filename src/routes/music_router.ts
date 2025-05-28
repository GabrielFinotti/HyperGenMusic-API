/**
 * Router de Músicas - HyperMusic API v2.0
 *
 * Endpoints públicos para consulta do catálogo musical:
 * - Listagem com paginação
 * - Busca por termo
 * - Filtro por gênero
 * - Detalhes de música específica
 *
 * Todos os endpoints requerem autenticação JWT.
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Router } from "express";
import { jwt } from "../middlewares";
import { musicController } from "../controllers";

const route = Router();

/**
 * GET /musics
 * Lista todas as músicas do catálogo com paginação
 * @query limit - Limite de resultados (padrão: 10)
 * @query offset - Paginação (padrão: 0)
 */
route.get("/musics", jwt.verifyToken, musicController.getAllMusic);

/**
 * GET /musics/search
 * Busca músicas por termo (título, artista)
 * @query term - Termo de busca
 * @query limit - Limite de resultados
 * @query offset - Paginação
 */
route.get("/musics/search", jwt.verifyToken, musicController.getMusicTerm);

/**
 * GET /musics/genre
 * Filtra músicas por gênero musical
 * @query genre - Gênero a ser filtrado
 * @query limit - Limite de resultados
 * @query offset - Paginação
 */
route.get("/musics/genre", jwt.verifyToken, musicController.getMusicGenre);

/**
 * GET /music/data/:musicId
 * Obtém dados detalhados de uma música específica
 * @param musicId - ID da música
 */
route.get(
  "/music/data/:musicId",
  jwt.verifyToken,
  musicController.getMusicData
);

export const musicRouter = route;
