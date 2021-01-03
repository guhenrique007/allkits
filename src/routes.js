const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Kit = require('./entities/Kit');

const TeamController = require('./controllers/TeamController');
const KitController = require('./controllers/KitController');


routes.get('/kits', KitController.show);
routes.get('/kits/:team', KitController.showByTeam);
routes.get('/teams/:team', TeamController.showByName);

routes.post('/teams', TeamController.store);
routes.post('/kits', multer(multerConfig).single("file"), KitController.store);

routes.delete('/kits/:id', KitController.destroy)

module.exports = routes;