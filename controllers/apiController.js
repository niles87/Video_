const db = require("../models");

module.exports = {
  findAllVideos: function (req, res) {
    db.Video.find()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
  },
  getVideo: function (req, res) {
    db.Video.find({ _id: req.params.id }).then((video) => res.json(video));
  },
  addVideo: function (req, res) {
    const video = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    };
    db.Video.create(video).then((response) => res.json(response));
  },
};
