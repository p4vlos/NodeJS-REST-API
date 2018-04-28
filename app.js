// load our app server using express..
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(morgan('short'))

// let's see how to start refactoring our code
// I'll show you how to use something called a Router

const router = require('./routes/user.js')
app.use(router)

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOT")
})

// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...");
})
