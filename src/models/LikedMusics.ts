/**
 * Modelo de Associação - Músicas Curtidas pelos Usuários
 * 
 * Representa a tabela de junção entre usuários e músicas curtidas,
 * implementando um sistema de favoritos/curtidas na aplicação.
 * 
 * Relacionamentos:
 * - Usuário (N:M) Música via liked_musics
 * 
 * Funcionalidades:
 * - Sistema de curtidas por usuário
 * - Histórico de músicas favoritas
 * - Cascade delete em remoção de usuário/música
 * 
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database/postgre_config";
import { LikedMusicsAttributes } from "../types";

class LikedMusics
  extends Model<LikedMusicsAttributes>
  implements LikedMusicsAttributes
{
  declare userId: number;
  declare musicId: number;
}

LikedMusics.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    musicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "musics",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "liked_musics",
    timestamps: false,
    indexes: [{ fields: ["userId"] }, { fields: ["musicId"] }],
  }
);

export default LikedMusics;
