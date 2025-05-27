/**
 * Interface de Dados de Playlist - HyperGenMusic API v2.0
 *
 * Define a estrutura de dados para operações de entrada de playlist,
 * como criação e atualização, excluindo campos gerados automaticamente.
 *
 * @interface PlaylistData
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
export interface PlaylistData {
    /** ID do usuário proprietário da playlist */
    userId: number;
    /** Nome da playlist */
    name: string;
}
