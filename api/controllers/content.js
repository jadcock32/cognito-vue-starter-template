class Content {
  constructor() {}

  content(req, res) {
    res.status(200).send('You made it!');
  };
}

module.exports = Content;