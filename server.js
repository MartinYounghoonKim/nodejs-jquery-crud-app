const express = require('express');
const app = express();
const router = require('./router/index')(app);
const port = 4000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

let server = app.use(express.static('public')).listen(port, () => {
    console.log(`Express server has started on port:${port}`);
});
