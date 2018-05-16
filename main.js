let http = require('http');
let app = require('./config/express.js')();
let db = require('./config/database.js');


http.createServer(app).listen(app.get('port'), function(){
  console.log('servidor rodando!');
});

db('mongodb://localhost/sistema');