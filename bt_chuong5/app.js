const express = require("express")
const path = require("path");
const app = new express();
const port = 8000
const hostname = "127.0.0.1"
app.set("view engine", "ejs")
app.set("views", "views")
app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.static(path.join(__dirname, "node_modules/bootstrap")))

let userRouter = require("./routers/user")
app.use("/", userRouter)
// require("./routers/user")(app)

app.listen(port, () => {
	console.log(`server running: http://${hostname}:${port}`);
})


