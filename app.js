// load our app server using express..
const express = require('express')
const app = express()

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOT")
})

app.get("/users", (req, res) => {
  var user1 = {firstName: "Stephen", lastName: "Curry"}
  const user2 = {firstName: "Kevin", lastName: "Durant"}
  res.json([user1, user2])

  // res.send("Nodemon auto updates when I save this file")
})

// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...");
})
