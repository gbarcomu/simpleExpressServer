const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const fs = require('fs');
const privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
const certificate = fs.readFileSync('sslcert/certificate.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const API_PATH = '/api/identity'
const PORT = 443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT);

app.get(API_PATH, (req, res) => res.send("App is Connected and Running!"));

app.post(API_PATH + '/ticket', (req, res) => {
  const { ticket } = req.body;
  fs.appendFile('tickets.txt', '[' + new Date(Date.now()) + '] ' + ticket + '\n', function (err) {
    if (err) throw err;
  });
  res.send();
});
