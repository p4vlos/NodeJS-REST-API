// will contaitn all of my user related routes

const express = require('express')
const mysql = require('mysql')

const router = express.Router()
router.get('/messages', (req, res) => {
  console.log("Show some messages or whatever..")
  res.end()
})

router.get("/users", (req, res) => {
    const connection = getConnection()
  
    const queryString = "SELECT * FROM users"
  
    connection.query(queryString, (err, rows, fields) => {
  
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("I think we fetched users successfully")
      
      const users = rows.map((row) => {
        return {firstName: row.first_name, lastName: row.last_name}
      })
  
      res.json(rows)
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'lbta_mysql'
})

function getConnection() {
    return pool
}

router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)
  
    const connection = getConnection()
  
    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE ID = ?"
    // const queryString = "SELECT * FROM users"
  
    connection.query(queryString, [userId], (err, rows, fields) => {
    // connection.query(queryString, (err, rows, fields) => {
  
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("I think we fetched users successfully")
      
      const users = rows.map((row) => {
        return {firstName: row.first_name, lastName: row.last_name}
      })
  
      res.json(rows)
    })
})

router.post('/user_create', (req, res) => {
    console.log("Trying to create a new user")
    console.log("How to get the data")

    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
    if (err) {
        console.log("Failed to insert new user: " + err)
        res.sendStatus(500)
        return
    }

    console.log("Inserted a new user with id: ", results);
    res.end()
    })
})


module.exports = router