const port = 4000
const { rejects } = require('assert')
const express = require('express')
const fs = require('fs')
const { resolve } = require('path')
const app = new express
const hostname = "127.0.0.1"
const moment = require ('moment')

app.use(express.static("public"))
// app.use(express.static(path.join(__dirname,"node_modules/bootstrap")))
app.set("view engine", "ejs")
app.set("views","view")
app.use(express.json())

const readFilePromise =  (path) => {
  return new Promise((resolve,rejects) => {
    fs.readFile(path,(err,data)=>{
      if (err) {
        return rejects(new Error(err))
      } else {
        data = JSON.parse(data)
        return resolve(data)
      }
    })
  })
}

app.get("/",(req,res)=> {
  readFilePromise("data.json")
  .then((data)=>{
    let result = {title: "Danh Sách Người Nổi Tiếng", data:data,moment}
    res.render("index",result)
  })
  .catch((error)=>{
    console.log(error);
  })
})

app.get("/gioiTinh", (req,res)=>{
  let gioiTinh = req.query.type
  console.log(gioiTinh);
  readFilePromise('data.json')
    .then((data) =>{
      // let result = []
      // data.forEach(item => {
      //   if (gioiTinh == item.gioiTinh){
      //     result.push(item)
      //   }
      // });
      let result = data.filter((item)=>{
        return item.gioiTinh == gioiTinh
      })

      if (result.length != 0) {
        let data = {title: "Danh Sách Người Nổi Tiếng", data:result,moment}
        res.render('index',data)
      } else {
        res.render('error')
      }
    })
    .catch((error)=>{
      console.log(error);
    })
}) 

app.get("/:slug", (req, res) => {
  let slug = req.params.slug
  readFilePromise("data.json")
      .then((data) => {
          let result = data.filter((item) => {
              return item.slug == slug
          })
          if (result.length != 0) {
              res.render("profile", { profile: result[0], moment })
          } else {
              res.render("error", { title: "404" })
          }

      })
      .catch((error) => {
          console.log(error);
      })
})




app.listen(port, () => {
  console.log(`server running: http://${hostname}:${port}`);
})
