let userController = require("../controllers/user")
let router = require("express").Router()
module.exports = (app)=>{
	router.get("/", userController.index)
	router.get("/gender", userController.gender)
	router.get("/:slug", userController.show)
	app.use("/",router)
}