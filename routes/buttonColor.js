const express = require("express");
const router = express.Router();
const buttonColorController = require("../controllers/buttonColor");

router.post("/", buttonColorController.buttonColor_post);
router.get("/", buttonColorController.buttonColor_get);
router.get("/:id", buttonColorController.buttonColor_getId);
router.patch("/:id", buttonColorController.buttonColor_update);
router.delete("/:id", buttonColorController.buttonColor_delete);

module.exports = router;
