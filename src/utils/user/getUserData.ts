import { Op } from "sequelize";
import User from "../../models/userModel";

export const getUserData = async (
  userId?: number,
  email?: string,
  username?: string
) => {
  try {
    if (userId && !email && !username) {
      return await User.findOne({
        where: { id: userId },
      });
    } else if (!userId && email && !username) {
      return await User.findOne({
        where: { email },
      });
    } else if (!userId && !email && username) {
      return await User.findOne({
        where: { username },
      });
    } else if (!userId && email && username) {
      return await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Erro ao obter dados do usuário: ${error}`.red.bgBlack);

    throw new Error("Falha ao obter usuário");
  }
};
