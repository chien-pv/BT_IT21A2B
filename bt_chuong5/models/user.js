const fs = require("fs")
const moment = require('moment');
const bodyParser = require("body-parser");
const readFilePromise = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if (err) {
				return reject(new Error(err))
			}
			data = JSON.parse(data);
			return resolve(data)
		})
	})
}
let User = new Object()
User.index = (callback) => {
	readFilePromise("data.json")
		.then((data) => {
			callback(data)
		})
		.catch((error) => {
			console.log(error);
		})

}
User.gender = (req, callback) => {
	let slug = req.query.type
	console.log(req.query);
	let gender = "-1"
	if (slug == "nam") {
		gender = "1"
	} else if (slug == "nu") {
		gender = "0"
	}
	readFilePromise("data.json")
		.then((data) => {
			let query = data.filter((item) => {
				return item.gender == gender
			})
			if (query.length != 0) {
				callback(query)
			} else {
				callback(null)
			}

		})
		.catch((error) => {
			console.log(error);
		})
}
User.show = (req, callback) => {
	let slug = req.params.slug
	readFilePromise("data.json")
		.then((data) => {
			let result = data.filter((item) => {
				return item.slug == slug
			})
			if (result.length != 0) {
				callback(result)
			} else {
				callback(null)
			}
		})
		.catch((error) => {
			console.log(error);
		})
}
module.exports = User