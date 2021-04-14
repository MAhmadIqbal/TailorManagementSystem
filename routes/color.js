const express = require("express");
const router = express.Router();
const colorController = require("../controllers/color");

router.post("/", colorController.color_post);
router.get("/", colorController.color_get);
router.get("/:id", colorController.color_getId);
router.patch("/:id", colorController.color_update);
router.delete("/:id", colorController.color_delete);

module.exports = router;
