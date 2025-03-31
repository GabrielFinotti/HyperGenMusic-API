/**
 * Utilitário de logging estruturado
 * Fornece uma interface consistente para logs em toda a aplicação
 */
import 'colors';

/**
 * Níveis de log suportados
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

/**
 * Configuração global do logger
 */
const loggerConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  includeTimestamp: true,
};

/**
 * Formata uma mensagem de log com timestamp e nível
 */
const formatLogMessage = (level: LogLevel, message: string): string => {
  let formattedMessage = '';
  
  // Adiciona timestamp se configurado
  if (loggerConfig.includeTimestamp) {
    const timestamp = new Date().toISOString();
    formattedMessage += `[${timestamp}] `;
  }
  
  // Adiciona o nível de log com cor apropriada
  let levelText: string;
  switch (level) {
    case LogLevel.DEBUG:
      levelText = String(level).blue;
      break;
    case LogLevel.INFO:
      levelText = String(level).green;
      break;
    case LogLevel.WARN:
      levelText = String(level).yellow;
      break;
    case LogLevel.ERROR:
      levelText = String(level).red;
      break;
    case LogLevel.FATAL:
      levelText = String(level).red;
      break;
    default:
      levelText = String(level);
  }
  
  // Usamos concatenação para evitar problemas com o bgBlack
  formattedMessage += `${levelText}: ${message}`;
  return formattedMessage;
};

/**
 * Determina se um nível de log deve ser exibido
 */
const shouldLog = (level: LogLevel): boolean => {
  const levels = Object.values(LogLevel);
  const configLevelIndex = levels.indexOf(loggerConfig.minLevel);
  const currentLevelIndex = levels.indexOf(level);
  
  return currentLevelIndex >= configLevelIndex;
};

/**
 * Converte um objeto para string formatada para log
 */
const formatObject = (obj: any): string => {
  try {
    return typeof obj === 'object' 
      ? JSON.stringify(obj, null, 2)
      : String(obj);
  } catch (err) {
    return '[Objeto não serializável]';
  }
};

/**
 * API de logging
 */
export const logger = {
  debug: (message: string, ...meta: any[]) => {
    if (shouldLog(LogLevel.DEBUG)) {
      console.log(formatLogMessage(LogLevel.DEBUG, message));
      meta.forEach(m => console.log(formatObject(m).gray));
    }
  },
  
  info: (message: string, ...meta: any[]) => {
    if (shouldLog(LogLevel.INFO)) {
      console.log(formatLogMessage(LogLevel.INFO, message));
      meta.forEach(m => console.log(formatObject(m)));
    }
  },
  
  warn: (message: string, ...meta: any[]) => {
    if (shouldLog(LogLevel.WARN)) {
      console.warn(formatLogMessage(LogLevel.WARN, message).yellow);
      meta.forEach(m => console.warn(formatObject(m).yellow));
    }
  },
  
  error: (message: string, error?: Error | any, ...meta: any[]) => {
    if (shouldLog(LogLevel.ERROR)) {
      console.error(formatLogMessage(LogLevel.ERROR, message).red);
      
      if (error) {
        if (error instanceof Error) {
          console.error(`  Erro: ${error.name}: ${error.message}`.red);
          if (error.stack) {
            console.error(`  Stack: ${error.stack.split('\n').slice(1).join('\n')}`.gray);
          }
        } else {
          console.error(`  Detalhe: ${formatObject(error)}`.red);
        }
      }
      
      meta.forEach(m => console.error(formatObject(m)));
    }
  },
  
  fatal: (message: string, error?: Error | any, ...meta: any[]) => {
    if (shouldLog(LogLevel.FATAL)) {
      console.error(formatLogMessage(LogLevel.FATAL, message).red);
      
      if (error) {
        if (error instanceof Error) {
          console.error(`  Erro fatal: ${error.name}: ${error.message}`.red);
          if (error.stack) {
            console.error(`  Stack: ${error.stack.split('\n').slice(1).join('\n')}`.gray);
          }
        } else {
          console.error(`  Detalhe fatal: ${formatObject(error)}`.red);
        }
      }
      
      meta.forEach(m => console.error(formatObject(m)));
    }
  },
  
  // Configuração do logger
  configure: (config: Partial<typeof loggerConfig>) => {
    Object.assign(loggerConfig, config);
  },
};
