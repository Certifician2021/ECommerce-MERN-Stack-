const { Router } = require("express");
const router = Router();

const productController = require("../controller/product.controller");

router.post("/", productController.addProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
