const express = require("express");
const router = express.Router();
const Fabric = require("../models/fabric");
const path = require("path");
const checkAuth = require("../middlewares/checkAuth");
const fabricController = require("../controllers/fabrics");

router.post("/", fabricController.fabric_post);
router.get("/", fabricController.fabric_get);
router.get("/:id", fabricController.fabric_getId);
router.patch("/:id", fabricController.fabric_update);
router.delete("/:id", fabricController.fabric_delete);

module.exports = router;
