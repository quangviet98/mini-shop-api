const express = require("express");
const router = express.Router();
const checkAuth = require("../../middleware/checkAuth");
const orderController = require("../../controllers/order");

router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderByAccountId);
router.get("/orders/detail/:id", orderController.getOrderDetail);
router.get("/orders/items/:id", orderController.getOrderItems);
router.put("/orders/:id", orderController.updateProcessOrder);

module.exports = router;
