const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const videoRoutes = require("./videos");

router.use("/api/v1", apiRoutes);

router.use("/videos", videoRoutes);

router.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

module.exports = router;
