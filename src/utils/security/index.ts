/**
 * Agregador de Utilitários de Segurança - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todas as funções relacionadas à segurança,
 * validação de dados, criptografia e gestão de tokens.
 *
 * Utilitários incluídos:
 * - verifyUserData: Validação de dados de usuário
 * - verifyMusicData: Validação de dados de música  
 * - hashPassword: Hash seguro de senhas com bcrypt
 * - comparePassword: Comparação de senhas hasheadas
 * - createToken: Criação de tokens JWT
 * - revokeToken: Revogação e blacklist de tokens
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import verifyUserData from "./verify_user_data";
import verifyMusicData from "./verify_music_data";
import hashPassword, { comparePassword } from "./hash_pass";
import createToken from "./create_token";
import revokeToken from "./revoke_token";

export {
  verifyUserData,
  verifyMusicData,
  hashPassword,
  comparePassword,
  createToken,
  revokeToken,
};
