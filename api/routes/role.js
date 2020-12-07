const express = require("express");
const router = express.Router();
const roleController = require("../../controllers/role");

router.get("/roles", roleController.getRoles);
router.get("/accounts/:id", roleController.getAccountById);
router.get("/accounts/roles/:id", roleController.getRolesAccount);
router.put("/accounts/roles/:id", roleController.updateRolesAccount);
router.put("/orders/:id", roleController.updateProcessOrder);

module.exports = router;
