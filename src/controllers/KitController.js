const kitRepo = require("../repositories/kitRepository");
const Team = require('../entities/Team');

class KitController {
  async store(req, res) {
    const { team } = req.body;

    const teamObj = await Team.findOne({ name: team }).exec();
    if(!teamObj){
      return res.status(404).json({ error: "Time não existe" });
    }

    req.body.teamId = teamObj._id;

    try {
      const kit = await kitRepo.create(req.body, req.file);
      return res.status(201).json({ kit });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    const kits = await kitRepo.get();
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
