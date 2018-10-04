const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const API_PATH = '/api/identity'
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get(API_PATH, (req, res) => res.send("App is Connected and Running!"));

app.listen(PORT, () => console.log('App listening on port ' + PORT));

app.post(API_PATH + '/ticket', (req, res) => {
  const { ticket } = req.body;
  fs.appendFile('tickets.txt', '[' + new Date(Date.now()) + '] ' + ticket + '\n', function (err) {
    if (err) throw err;
  });
  res.send();
});
