import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/database/databaseConfig";

interface UserAttributes {
  id: number;
  username: string;
  imageUrl?: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public imageUrl?: string;
  public email!: string;
  public password!: string;
  public role!: "user" | "admin";

  public async checkPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  public toJSON() {
    const values: Partial<UserAttributes> = JSON.parse(
      JSON.stringify(this.get())
    );

    delete values.password;

    return values;
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
      },
      set(value: string) {
        this.setDataValue("email", value.trim().toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password") && user.password) {
          const isHashed = user.password.startsWith("$2b$");

          if (!isHashed) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      },
    },
  }
);

export default User;
