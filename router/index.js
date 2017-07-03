const mysql = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');
connection.connect();
// TODO: render 파일이 같은 파일인데, 코드를 정리하는 방법이 없는지
module.exports = function(app)
{
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/',(req,res)=>{
        res.render('index.ejs',{reference:"Board"})
    });
}
