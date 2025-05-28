/**
 * Agregador de Controllers de Música Administrativos - HyperMusic API v2.0
 *
 * Centraliza e exporta todos os controllers administrativos para operações
 * de gestão do catálogo musical, incluindo CRUD completo e busca avançada.
 *
 * Controllers incluídos:
 * - adminGetAllMusics: Listagem completa com paginação estrita
 * - adminGetMusicTerm: Busca por termo com validação rigorosa  
 * - adminCreateMusic: Criação com upload de arquivos
 * - adminUpdateMusic: Atualização de metadados
 * - adminDeleteMusic: Remoção individual
 * - adminDeleteAllMusics: Remoção em lote (operação destrutiva)
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import adminGetAllMusics from "./admin_get_all_musics";
import adminGetMusicTerm from "./admin_get_music_term";
import adminCreateMusic from "./admin_create_music";
import adminUpdateMusic from "./admin_update_music";
import adminDeleteMusic from "./admin_delete_music";
import adminDeleteAllMusics from "./admin_delete_all_musics";

export {
  adminGetAllMusics,
  adminGetMusicTerm,
  adminCreateMusic,
  adminUpdateMusic,
  adminDeleteMusic,
  adminDeleteAllMusics,
};
