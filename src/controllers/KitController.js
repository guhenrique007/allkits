const kitRepo = require("../repositories/kitRepository");
const Team = require('../entities/Team');
const CountryList = require('../entities/Country');

class KitController {
  async store(req, res) {
    const { sportwear, model, platform, season, teamId, team } = req.body; 

    console.log(req.body,'\n', req.file);

    const teamObj = await Team.findOne({ name: team }).exec();
    if(!teamObj){
      return res.status(404).json({ error: "Time não existe" });
    }

    const data = { sportwear, model, platform, season, credits, storage, teamId, team, teamId: teamObj._id };
    const file = req.file ? req.file : req.body.file;

    try {
      const kit = await kitRepo.create(data, file);
      return res.status(201).json({ kit });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    const { limit = 10 } = req.query;
    const kits = await kitRepo.get(parseInt(limit));
    return res.json(kits)
  }

  async showByTeam(req, res) {
    const { team } = req.params;

    const teamObj = await Team.findOne({ name: team }).exec();
    if(!teamObj){
      return res.status(404).json({ error: "Time não existe" });
    }

    console.log(teamObj)

    const kits = await kitRepo.getByTeam(teamObj._id);
    console.log(kits)
    return res.json(kits)
  }

  async destroy(req, res) {
    const kit = await kitRepo.delete(req.params.id);

    return res.send() 
  }
}

module.exports = new KitController();
