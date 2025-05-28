/**
 * Agregador de Utilitários de Storage - HyperMusic API v2.0
 *
 * Centraliza e exporta todas as funções relacionadas ao gerenciamento
 * de arquivos no Cloudflare R2, incluindo operações de remoção.
 *
 * Utilitários disponíveis:
 * - deleteArchiveForBucket: Remoção segura de arquivos do R2
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import deleteArchiveForBucket from "./delete_archive";

export { deleteArchiveForBucket };
