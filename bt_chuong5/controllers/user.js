let moment = require("moment")
let User = require("../models/user")
index = (req, res) => {
	User.index((response) => {
		let result = { title: "Danh sách sinh viên", data: response, moment }
		res.render("index", result)
	});
}
gender = (req, res) => {
	User.gender(req,(response)=>{
		console.log(response);
		if(response){
			res.render("index", { data: response, moment, title: "Danh sách sinh viên", })
		}else{
			res.render("error")
		}

	})
}
show = (req, res) => {
	User.show(req,(response)=>{
		if(response){
			res.render("profile", { profile: response[0], moment })
		}else{
			res.render("error")
		}
	})
}
module.exports = {
	index, show, gender
}