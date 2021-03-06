"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    var now = new Date();
    return queryInterface.bulkInsert("jobs", [
      {
        title: "Job Post Title One",
        slug: "job-post-title-one",
        userId: 1,
        content: "Text content job post one",
        emailTo: "email1@email.com",
        reportManager: "HR Manager",
        dateLimit: new Date(now.getFullYear(), now.getMonth() + 1, 1),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("jobs", null, {});
  },
};
