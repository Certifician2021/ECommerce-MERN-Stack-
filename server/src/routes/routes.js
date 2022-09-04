const { Router } = require("express");
const router = Router();

const userRoutes = require("./user.routes");
// const adminRoutes = require("./admin.routes");
const loginRoutes = require("./login.routes");
const productRoutes = require("./product.routes");

router.use("/users", userRoutes);
// router.use("/admin", adminRoutes);
router.use("/login", loginRoutes);
router.use("/product", productRoutes);

module.exports = router;
