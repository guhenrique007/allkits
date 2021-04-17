const Kit = require('../entities/Kit');
const Team = require('../entities/Team');
const utils = require('../utils');

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

exports.getByFilter = async(filters) => {
  const query = [];

  for(field in filters) {
    if(filters[field]) {
      if(field === 'country'){
        const teams = await Team.find({ country: filters.country });
        const teamList = getTeamNames(teams);
        query.push( { team: { $in: teamList }} );
      } else {
        query.push( { [field]: filters[field]} )
      }
    }
  }

  console.log(query)

  return await Kit.find( { $and: query } );
}

exports.delete = async(id) => {
  const kit = await Kit.findById(id);
  console.log(kit)
  return await kit.remove();
}

const getTeamNames = (teams) => {
  const teamList = [];
  teams.forEach((team) =>{
    teamList.push(team.name);
  })
  return teamList;
}