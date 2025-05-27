/**
 * Agregador de Controllers de Música Públicos - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todos os controllers públicos para consulta
 * do catálogo musical, incluindo listagem, busca e filtros.
 *
 * Controllers incluídos:
 * - getAllMusic: Listagem completa com paginação flexível
 * - getMusicGenre: Filtro por gênero musical
 * - getMusicTerm: Busca textual por termo
 * - getMusicData: Detalhes completos de música específica
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import getAllMusic from "./get_all_music";
import getMusicGenre from "./get_music_genre";
import getMusicTerm from "./get_music_term";
import getMusicData from "./get_music_data";

export { getAllMusic, getMusicGenre, getMusicTerm, getMusicData };
