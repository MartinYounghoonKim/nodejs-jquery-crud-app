const mysql = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');
connection.connect();

module.exports = function(app)
{
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/',(req,res)=>{
        res.render('index.html')
    });
    app.get('/index2',(req,res)=>{
        res.render('index2.html');
    });
    app.get('/board',(req,res)=>{
        res.render('board.html');
    });
    app.get('/write',(req,res)=>{
        res.render('write.html');
    });
    app.post('/write/add', (req,res)=>{
        let title = req.body.title;
        let content = req.body.content;
        let creator_id = req.body.creator_id;

        let sql = 'INSERT INTO test_db(creator_id, title, content) VALUES (?,?,?)'
        connection.query(sql,[creator_id,title,content], (err,result, fields)=>{
            if(err){
                console.log(err);
                res.send("Network Error");
            } else {
                res.redirect("/board");
            }
        })
    });
    app.get('/studydb', (req,res)=>{
        connection.query('SELECT * from test_db', function(err, rows) {
            if(err) throw err;
            res.send(rows);
        });
    });
}
