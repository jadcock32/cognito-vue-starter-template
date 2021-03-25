const Authentication = require('../controllers/authentication.js');
const ac = new Authentication();

const baseUrl = '/api/authentication';

module.exports = app => {  
  app.post(`${baseUrl}/register`, (req, res) => ac.register(req, res));

  app.post(`${baseUrl}/confirmRegistration`, (req, res) => ac.confirmRegistration(req, res));

  app.post(`${baseUrl}/authenticate`, (req, res) => ac.authenticate(req, res));

  app.post(`${baseUrl}/authenticated`, (req, res) => ac.authenticated(req, res));

  app.post(`${baseUrl}/logout`, (req, res) => ac.logout(req, res));
};
