const Content = require('../controllers/content.js');
const cc = new Content();

const baseUrl = '/api/content';

module.exports = (app, authorizer) => {  
  app.get(`${baseUrl}`, (req, res, next) => authorizer(req, res, next), (req, res) => cc.content(req, res));
};
