const express = require("express");
const router = express.Router();
const cuffController = require("../controllers/cuff");

router.post("/", cuffController.cuff_post);
router.get("/", cuffController.cuff_get);
router.get("/:id", cuffController.cuff_getId);
router.patch("/:id", cuffController.cuff_update);
router.delete("/:id", cuffController.cuff_delete);

module.exports = router;
