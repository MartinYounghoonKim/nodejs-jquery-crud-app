const mysql = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');
connection.connect();
// TODO: render 파일이 같은 파일인데, 코드를 정리하는 방법이 없는지
module.exports = (app)=>{
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/',(req,res)=>{
        let idx = req.params.idx;
        if(idx){
            res.send('test')
        } else {
            res.render('index.ejs',{reference:"CrudBoard"});
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
    });
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
    });
    app.post('/delete/Board',(req,res)=>{
        let deleteSql = 'DELETE FROM board WHERE idx=?';
        let idx = req.body.idx;
        connection.query(deleteSql,[idx], (err, result,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error!!!");
            } else {
                res.redirect('/');
            }
        })
    });
    app.post('/edit/Board', (req,res)=>{
        let idx = req.body.idx;
        let title = req.body.title;
        let content = req.body.content;
        console.log("idx : " + idx + "\n" + "title : " + title + "\n" + "content : " + content + "\n" )
        let updateSql = 'UPDATE board SET title=?, content=? WHERE idx=?';
        connection.query(updateSql,[title, content,idx],(err,result,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error!!!");
            } else {
                console.log("성공" + result)
                res.redirect('/');
            }
        })
    });
    app.get('/edit/board1', (req,res)=>{
        let idx = req.query.idx;
        let searchSql = 'SELECT * FROM board WHERE idx=?';
        connection.query(searchSql, [idx], (err, result, fields)=>{
            if(err){
                console.log(err);
                res.send("Error!!");
            } else {
                res.send(result);
            }
        })
    })
}
