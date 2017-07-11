const mysql = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');
connection.connect();
// TODO: render 파일이 같은 파일인데, 코드를 정리하는 방법이 없는지
module.exports = (app)=>{
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/',(req,res)=>{
        res.render('index.ejs',{reference:"Board"})
    });
    app.get('/api/Board',(req,res)=>{
        let inquerySql = 'SELECT * FROM board';
        connection.query(inquerySql, (err,result, fields)=>{
            if(err) {
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send(result);
            }
        })
    })
    /*app.post('/topic/add', (req,res)=>{
        let title = req.body.title;
        let content = req.body.content;
        let creator_id = req.body.creator_id;
        let sql = 'INSERT INTO test_db(creator_id, title, content) VALUES (?,?,?)';
        connection.query(sql,[creator_id, title, content], (err, result,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error!!!");
            } else {
                res.redirect('/topic/'+ creator_id);
            }
        })
    });*/
    app.post('/new/Board', (req,res)=>{
        let title = req.body.title;
        let content = req.body.content;
        let creator_id = req.body.creator_id;
        let insertSql = 'INSERT INTO board(creator_id, title, content) VALUES (?,?,?)';
        connection.query(insertSql,[creator_id, title, content], (err, result,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error!!!");
            } else {
                res.redirect('/');
            }
        })
    })
}
