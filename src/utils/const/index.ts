/**
 * Agregador de Constantes - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todas as constantes da aplicação,
 * incluindo parâmetros de validação e configurações.
 *
 * Constantes incluídas:
 * - minChar: Limites mínimos de caracteres para validação
 * - regex: Expressões regulares para validação de formatos
 * - authTokenTemp: Configurações de tempo de vida dos tokens
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { minChar, regex } from "./verify_data";
import { authTokenTemp } from "./auth";

export { minChar, regex, authTokenTemp };
