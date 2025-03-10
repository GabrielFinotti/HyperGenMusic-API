import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/database/databaseConfig";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  imageUrl?: string;
  role: "user" | "admin";
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare imageUrl?: string;
  declare role: "user" | "admin";

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  toPublicJSON(): Omit<UserAttributes, "password"> {
    const { password, ...publicData } = this.get({
      plain: true,
    }) as UserAttributes;
    return publicData;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 12],
        notEmpty: true,
      },
      set(value: string) {
        this.setDataValue("username", value.trim());
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      set(value: string) {
        this.setDataValue("email", value.trim().toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 100],
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["username"],
      },
    ],
    hooks: {
      beforeCreate: async (user: User) => {
        const plainPassword = user.getDataValue("password");

        user.setDataValue("password", await bcrypt.hash(plainPassword, 10));
      },
      beforeUpdate: async (user: User) => {
        if (
          user.changed("password") &&
          user.getDataValue("password") &&
          !user.getDataValue("password").startsWith("$2b$")
        ) {
          const plainPassword = user.getDataValue("password");

          user.setDataValue("password", await bcrypt.hash(plainPassword, 10));
        }
      },
    },
  }
);

export default User;
