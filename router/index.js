const mysql = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');
connection.connect();
// TODO: render 파일이 같은 파일인데, 코드를 정리하는 방법이 없는지
module.exports = (app)=>{
    app.use(bodyParser.urlencoded({ extended: false }));
    /*app.get('/board/edit/:idx',(req,res)=>{
        let inquerySql = 'SELECT * FROM board WHERE idx=?';
        let idx=req.params.idx;
        console.log(idx)
        connection.query(inquerySql,[idx],(err,result,fields)=>{
            if(err){

            } else {
                res.send(result)
            }
        })
    })*/
    /*app.get(['/topic','/topic/:id'], function(req,res){
        let sql = 'SELECT * FROM test_db';
        connection.query(sql, (err, result, fields)=>{
            let id = req.params.id;
            if(id) {
                let sql = 'SELECT * FROM test_db WHERE creator_id=?';
                connection.query(sql, [id], (err, result, fields)=>{
                    if(err){
                        console.log(err);
                    } else {
                        res.render('view_mysql',{results:result, result:result[0]});
                    }
                })
            } else {
                let params = ['Hello', "there"];
                res.render('view_mysql',{result:result});
            }
        })
    });*/
    app.get(['/board','/board/edit/:idx'],(req,res)=>{
        let idx = req.params.idx;
        if(idx){
            res.send('test')
        } else {
            res.render('index.ejs',{reference:"Board"});
        }
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
                res.redirect('/board');
            }
        })
    });
    app.post('/delete/Board',(req,res)=>{
        let deleteSql = 'DELETE FROM board WHERE idx=?';
        let idx = req.body.idx;
        connection.query(deleteSql,[idx], (err, result,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error!!!");
            } else {
                res.redirect('/board');
            }
        })
    })
}
