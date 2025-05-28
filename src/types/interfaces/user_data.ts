/**
 * Interface de Dados de Usuário - HyperMusic API v2.0
 *
 * Define a estrutura de dados para operações de entrada de usuário,
 * como criação e atualização, excluindo campos gerados automaticamente.
 *
 * @interface UserData
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
export interface UserData {
  /** Nome de usuário único */
  username: string;
  /** Endereço de email único */
  email: string;
  /** Senha em texto plano (será criptografada) */
  password: string;
  /** Número de telefone (opcional) */
  phone?: string;
  /** URL da imagem de perfil (opcional) */
  imageUrl?: string;
  /** Nível de acesso do usuário */
  role: "user" | "admin" | "dev";
}
