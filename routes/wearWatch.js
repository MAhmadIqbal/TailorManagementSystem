const express = require("express");
const router = express.Router();
const wearWatchController = require("../controllers/wearWatch");

router.post("/", wearWatchController.wearWatch_post);
router.get("/", wearWatchController.wearWatch_get);
router.get("/:id", wearWatchController.wearWatch_getId);
router.patch("/:id", wearWatchController.wearWatch_update);
router.delete("/:id", wearWatchController.wearWatch_delete);

module.exports = router;
