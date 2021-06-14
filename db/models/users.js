"use strict";
const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, { as: "posts", foreignKey: "userId" });
      this.hasMany(models.Job, { as: "jobs", foreignKey: "userId" });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: async function (user, options) {
          user.password = await bcrypt.hashSync(user.password, 10);
        },
      },

      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
