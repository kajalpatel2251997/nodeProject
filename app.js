const express = require('express');
// const mongoose =require('mongoose');
const dotenv = require('dotenv')
const app = express();

// var http = require('http');

// const { Router } = require('express');
// const router = require('./router/auth');

dotenv.config({path:'./config.env'})
const port = process.env.PORT

require('./db/conn');
app.use(express.json())
app.use(require('./router/auth'))

function middlewear (req, res, next){
 console.log("middlewear")

 next()
}




app.get("/", (req, res) => {
  res.send("this is home page")
})



app.get("/about",(req,res)=> {
  res.send("this is about page")
}) 

app.get("/singin", (req, res) => {
  res.send("this is singin page")
})

app.get("/contact", middlewear, (req, res) => {
   res.send("this is contact page")
})
app.listen(port, () => {
  console.log(`server is running on port no ${port}`)
})




