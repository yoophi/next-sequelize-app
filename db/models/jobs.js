"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
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
  Job.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      content: DataTypes.TEXT,
      emailTo: DataTypes.STRING,
      reportManager: DataTypes.STRING,
      dateLimit: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Job",
      tableName: "jobs",
      hooks: {
        beforeCreate: function (job, options) {
          // Do stuff
          job.slug = job.title
            .toLowerCase()
            .replace(/[^A-Za-z0-9 -]/g, "") // remove invalid chars
            .replace(/\s+/g, "-") // collapse whitespace and replace by -
            .replace(/-+/g, "-");
        },
      },
    }
  );
  return Job;
};
