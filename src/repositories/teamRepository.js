const Team = require('../entities/Team');

exports.create = async (data) => {
  const { name, country } = data; 

  const team = await Team.create({
    name,
    country
  })

  return team;
}

exports.getByName = async (name) => {
  const team = await Team.findOne({ name }).exec();

  return team;
}