const express = require("express");
const router = express.Router();
const accountController = require("../../controllers/account");

router.get("/accounts", accountController.getAccounts);
router.get("/accounts/:id", accountController.getAccountById);
router.get("/accounts/roles/:id", accountController.getRolesAccount);
router.put("/accounts/roles/:id", accountController.updateRolesAccount);
router.put("/orders/:id", accountController.updateProcessOrder);

module.exports = router;
