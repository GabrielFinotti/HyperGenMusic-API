/**
 * Atributos do Modelo User - HyperMusic API v2.0
 *
 * Define a estrutura de dados para o modelo User, incluindo
 * campos obrigatórios e opcionais, tipos de dados e roles.
 *
 * @interface UserAttributes
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
export interface UserAttributes {
  /** ID único do usuário (chave primária) */
  id: number;
  /** Nome de usuário único */
  username: string;
  /** Endereço de email único */
  email: string;
  /** Senha criptografada do usuário */
  password: string;
  /** Número de telefone (opcional) */
  phone?: string;
  /** URL da imagem de perfil (opcional) */
  imageUrl?: string;
  /** Nível de acesso do usuário */
  role: "user" | "admin" | "dev";
  /** Último token JWT válido (para revogação) */
  lastToken?: string;
}
