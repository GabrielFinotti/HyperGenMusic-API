/**
 * Padrões RegEx para validação de dados
 */

/**
 * Conjunto de expressões regulares para validação
 */
export const validationPatterns = {
  /**
   * Padrão para validação de email
   */
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  /**
   * Padrão para validação de letra maiúscula
   */
  uppercase: /[A-Z]/,
  
  /**
   * Padrão para validação de números
   */
  number: /[0-9]/,
  
  /**
   * Padrão para validação de caracteres especiais
   */
  specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  
  /**
   * Padrão para validação de URLs
   */
  url: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
};
