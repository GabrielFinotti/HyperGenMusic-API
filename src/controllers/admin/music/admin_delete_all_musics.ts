/**
 * Controller de Remoção Completa de Catálogo - HyperMusic API v2.0
 *
 * Gerencia a operação destrutiva de remoção completa do catálogo
 * musical através do painel administrativo. Remove todas as músicas
 * do banco de dados e arquivos associados no storage.
 *
 * Funcionalidades:
 * - Remoção completa do catálogo musical
 * - Exclusão de arquivos de áudio do storage
 * - Exclusão de imagens de capa associadas
 * - Operação irreversível (uso com cautela)
 * - Logs de auditoria da operação
 * - Resposta padronizada de confirmação
 *
 * ⚠️ ATENÇÃO: Operação destrutiva, use apenas em desenvolvimento!
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";

/**
 * Controller Administrativo - Deletar Todas as Músicas
 *
 * ⚠️ OPERAÇÃO DESTRUTIVA - Remove todas as músicas do catálogo
 * incluindo arquivos de áudio e imagens associadas.
 * Deve ser usado com extrema cautela apenas em ambientes de desenvolvimento.
 *
 * @returns Confirmação do número de músicas removidas
 */
const adminDeleteAllMusics = async (req: Request, res: Response) => {
  try {
    const isError = await AdminServiceImpl.deleteAllMusic();

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting all musics",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminDeleteAllMusics;
