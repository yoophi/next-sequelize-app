"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: "user" });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      content: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      hooks: {
        beforeCreate: function (post, options) {
          // Do stuff
          post.slug = post.title
            .toLowerCase()
            .replace(/[^A-Za-z0-9 -]/g, "") // remove invalid chars
            .replace(/\s+/g, "-") // collapse whitespace and replace by -
            .replace(/-+/g, "-");
        },
      },
    }
  );
  return Post;
};
