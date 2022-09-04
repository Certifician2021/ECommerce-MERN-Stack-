const { Router } = require("express");
const router = Router();

const userController = require("../controller/user.controller");

router.post("/", userController.signUp);
router.get("/",userController.getAllUsers)
router.post("/permission" ,userController.givePermission)

module.exports = router;
