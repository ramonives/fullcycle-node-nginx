const express = require('express')
const app = express()
const mysql = require('mysql')
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
};

const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) VALUES 
    ('Ramon'), 
    ('Jane Doe'), 
    ('Jhon Doe')`
connection.query(sql)

app.get('/', (req, res) => {

    connection.query(`SELECT name FROM people`, (err, results) => {
      if (err) throw err;

      let response = '<h1>Full Cycle Rocks!</h1><ul>';
      results.forEach(person => {
        response += `<li>${person.name}</li>`;
      });
      response += '</ul>';

      res.send(response);
    });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})