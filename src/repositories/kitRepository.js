const Kit = require('../entities/Kit');

exports.create = async (data, file) => {
  const { originalname: name, size, key, location: url = ''} = file;
  const { sportwear, model, platform, season, teamId, team } = data; 

  const kit = await Kit.create({
    name,
    size,
    key, 
    url,
    sportwear: 'adidas',
    teamId,
    team,
    model,
    platform,
    season
  })

  return kit;
};

exports.get = async() => {
  return await Kit.find();
}

exports.getById = async(id) => {
  return await Kit.findById(id);
}

exports.getByTeam = async(id) => {
  return await Kit.find({ teamId: id });
}

exports.delete = async(id) => {
  const kit = await Kit.findById(id);
  console.log(kit)
  return await kit.remove();
}