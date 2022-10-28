let userController = require("../controllers/user")
let express = require("express")
let router = express.Router()
router.get("/", userController.index)
router.get("/gender", userController.gender)
router.get("/:slug", userController.show)
module.exports = router;