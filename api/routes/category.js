const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/category");

router.get("/categories", categoryController.get_all_categories);
router.get("/categories/:id", categoryController.get_one_category);
router.post("/categories", categoryController.post_insert);
router.put("/categories/:id", categoryController.update_category);
router.delete("/categories/:id", categoryController.delete_one);

module.exports = router;
