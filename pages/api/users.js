// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const models = require("../../db/models/index");

export default async (req, res) => {
  const users = await models.User.findAll({});

  res.status(200).json({ data: users });
};
