import User from "../../models/userModel";

interface UserAdminService {
  getAllUsers(): Promise<User[]>;
}

class UserAdminServiceImpl implements UserAdminService {
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "email", "role"],
      });

      if (!users) {
        return [];
      }

      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserAdminServiceImpl();
