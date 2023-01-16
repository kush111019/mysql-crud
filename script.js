const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Takkupulto22@",
    database: "node_restapi"
  });


  app.get('/api/items',(req, res) => {
    let sqlQuery = "SELECT * FROM items";
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  app.get('/api/items/:id',(req, res) => {
    let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id;
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  app.post('/api/items',(req, res) => {
    let data = {title: req.body.title, body: req.body.body};
    
    let sqlQuery = "INSERT INTO items SET ?";
    
    let query = conn.query(sqlQuery, data,(err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  app.put('/api/items/:id',(req, res) => {
    let sqlQuery = "UPDATE items SET title='"+req.body.title+"', body='"+req.body.body+"' WHERE id="+req.params.id;
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  app.delete('/api/items/:id',(req, res) => {
    let sqlQuery = "DELETE FROM items WHERE id="+req.params.id+"";
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });

  function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });



  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

  //flush privileges;