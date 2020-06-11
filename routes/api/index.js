const router = require("express").Router();
const apiController = require("../../controllers/apiController");

router.route("/").get(apiController.findAllVideos).post(apiController.addVideo);

router.route("/:id").get(apiController.getVideo);

module.exports = router;
