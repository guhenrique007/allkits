const Kit = require('../entities/Kit');

exports.create = async (data, file) => {
  const { originalname: name, size = 0, key = '', location: url = ''} = file;
  const { sportwear, model, platform, season, teamId, team, credits, storage } = data; 

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
    season,
    credits,
    storage
  })

  return kit;
};

exports.get = async(limit) => {
  return await Kit.find().limit(limit);
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