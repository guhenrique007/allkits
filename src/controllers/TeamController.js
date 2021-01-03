const teamRepo = require("../repositories/teamRepository");
const countryList = require("../entities/Country");

class TeamController {
  async store(req, res) {
    const { body } = req;

    const countryExists = Object.values(countryList).includes(body.country);
    if (!countryExists) {
      return res.status(404).json({ error: "País não existe" });
    }

    const teamExists = await teamRepo.getByName(body.name);
    if (teamExists) {
      return res.status(404).json({ error: "Time já existe" });
    }

    try {
      const team = await teamRepo.create(body);
      return res.status(201).json({ team });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message });
    }
  }

  async showByName(req, res) {
    const { team } = req.params;

    const teamObj = await teamRepo.getByName(team)
    if(!teamObj){
      return res.status(404).json({ error: "Time não existe" });
    }

    console.log(teamObj)

    return res.json(teamObj)
  }
}

module.exports = new TeamController();