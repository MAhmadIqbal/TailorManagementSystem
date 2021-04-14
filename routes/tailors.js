const express = require("express");
const router = express.Router();
const Tailor = require("../models/tailor");
const path = require("path");
const checkAuth = require("../middlewares/checkAuth");
const tailorController = require("../controllers/tailors");

router.post("/", tailorController.tailor_post);
router.get("/", tailorController.tailors_get);
router.get("/:id", tailorController.tailor_getId);
router.patch("/:id", tailorController.tailors_update);
router.delete("/:id", tailorController.tailor_delete);

module.exports = router;
