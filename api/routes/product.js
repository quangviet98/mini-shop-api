const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product");

router.get("/products", productController.get_all_products);
router.get("/products/:id", productController.get_one_product);
router.post("/products", productController.post_insert);
router.put("/products/:id", productController.patch_update_product);
router.delete("/products/:id", productController.delete_one);

module.exports = router;
