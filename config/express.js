let express = require('express');

let usuarioRotas = require('../app/routes/usuario.js');
let postRotas = require('../app/routes/post.js');

let bodyParser = require('body-parser');

let path = require('path');

module.exports = function() {
  let app = express();
  app.set('port', 3000);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  usuarioRotas(app);
  postRotas(app);

   app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    
  return app;
}