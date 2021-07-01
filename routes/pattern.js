const express = require("express");
const router = express.Router();
const patternController = require("../controllers/pattern");

router.post("/", patternController.pattern_post);
router.get("/", patternController.pattern_get);
router.get("/:id", patternController.pattern_getId);

// router.patch("/:id", styleController.style_update);
// router.delete("/:id", styleController.style_delete);

module.exports = router;
