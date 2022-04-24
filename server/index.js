const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');

const app = express()

var cors = require('cors');
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "MovieDB"
  
});

db.connect(function(err) {
  if (err){
      console.log(err);
  }
  else {
      console.log("Connected..!");
    }
});

app.post('/create', (req, res) => {
  
  let title = req.body.title;
  let author = req.body.author;
  let rate = req.body.rate;
  let feedback = req.body.feedback;

  
    let sql = "INSERT INTO movies (title, author, rate, feedback) VALUES (?, ?, ?, ?)";
    db.query(sql, [title, author, rate, feedback], (err, result) => {
      if(err) {
        console.log(err);
      } else {
        res.status(200).send('Value Inserted: ' + result)
      }
    });
  });

  app.get('/movies', (req, res) => {
    let sql = "SELECT * FROM movies";
    db.query(sql, (err, result) => {
      if(err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).send(result)
      }
    });
  });

  app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;

    db.query("DELETE FROM movies WHERE Movieid=?",id, (err, result) => {
      if(err) {
        console.log(err);
      } else {
        res.status(200).send(result)
      }
    })
  })

  app.put('/update/:id', (req, res) => {

     let id = req.params.id
     let title = req.body.title;
     let author = req.body.author;
     let rate = req.body.rate;
     let feedback = req.body.feedback;
    
     console.log(req.params.id);

    
    //db.query("UPDATE movies SET title=?, author=?, rate=?, feedback=? WHERE Movieid=?", [title, author, rate, feedback, id], (err, result) => {
      db.query("UPDATE movies SET feedback=? WHERE Movieid=?", [feedback, id], (err, result) => {

      if(err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).send(result)
      }
    });
  });

      // db.query("CREATE DATABASE MovieDB", function (err, result) {

        //  let sql = "CREATE TABLE movies (name VARCHAR(255), author VARCHAR(255), rate INT, feedback VARCHAR(255))";
      //    db.query(sql, function (err, result) {
      //      if (err) throw err;
      // console.log("Database Created..");
       //    console.log("Table Created..");
  
app.listen(3001, () => {
    console.log('You are on port 3001');
})