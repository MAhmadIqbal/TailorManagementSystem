const express = require("express");
const router = express.Router();
const styleController = require("../controllers/Style");

router.post("/", styleController.style_post);
router.get("/", styleController.style_get);
router.get("/:id", styleController.style_getId);
router.patch("/:id", styleController.style_update);
router.delete("/:id", styleController.style_delete);

module.exports = router;
