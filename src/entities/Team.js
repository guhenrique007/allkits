const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  country: String,
  name: String,
  companyName: String,
});

module.exports = mongoose.model('Team', TeamSchema);