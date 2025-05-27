/**
 * Agregador de Interfaces de Serviços - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todas as interfaces que definem os contratos
 * da camada de serviços, estabelecendo os métodos para lógica de
 * negócio de cada módulo da aplicação.
 *
 * Interfaces incluídas:
 * - UserService: Contrato para lógica de negócio de usuários
 * - MusicService: Contrato para lógica de negócio de músicas
 * - AdminService: Contrato para operações administrativas
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { UserService } from "./user_service";
import { MusicService } from "./music_service";
import { AdminService } from "./admin_service";

export { UserService, MusicService, AdminService };
