const express = require("express");
const router = express.Router();
const Collar = require("../models/collar");
const path = require("path");
const checkAuth = require("../middlewares/checkAuth");
const collarController = require("../controllers/collars");

router.post("/", collarController.collar_post);
router.get("/", collarController.collar_get);
router.get("/:id", collarController.collar_getId);
router.patch("/:id", collarController.collar_update);
router.delete("/:id", collarController.collar_delete);

module.exports = router;
