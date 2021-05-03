const express = require("express");
const router = express.Router();
const ShirtLength = require("../models/shirtLength");
const path = require("path");
const checkAuth = require("../middlewares/checkAuth");
const shirtLengthController = require("../controllers/shirtLength");

router.post("/", shirtLengthController.shirtLength_post);
router.get("/", shirtLengthController.shirtLength_get);
router.get("/:id", shirtLengthController.shirtLength_getId);
router.patch("/:id", shirtLengthController.shirtLength_update);
router.delete("/:id", shirtLengthController.shirtLength_delete);

module.exports = router;
