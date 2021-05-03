const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customers");

router.post("/", customerController.customer_post);
router.get("/", customerController.customer_get);
router.get("/:id", customerController.customer_getId);
router.patch("/:id", customerController.customer_update);
router.delete("/:id", customerController.customer_delete);

module.exports = router;
