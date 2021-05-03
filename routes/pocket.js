const express = require("express");
const router = express.Router();
const pocketController = require("../controllers/pocket");

router.post("/", pocketController.pocket_post);
router.get("/", pocketController.pocket_get);
router.get("/:id", pocketController.pocket_getId);
router.patch("/:id", pocketController.pocket_update);
router.delete("/:id", pocketController.pocket_delete);

module.exports = router;
