const express = require('express');
const app = express();
const port = 4000;
const mysql = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
connection.connect();
const router = require('./router/index')(app, mysql, bodyParser, connection);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

let server = app.use(express.static('public')).listen(port, () => {
    console.log(`Express server has started on port:${port}`);
});
