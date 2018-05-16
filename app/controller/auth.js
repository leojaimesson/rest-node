let bcrypt = require('bcrypt');
let Usuario = require('../models/usuario.js');
let jwt = require('jsonwebtoken');

module.exports.checar = function(request, response, next) {
  if(!request.query.token) {
    console.log(request.query.token)
    response.status(400).send("não tem token");
  }
  jwt.verify(request.query.token, 'secret', 
    function(err, decoded) {
      if(err) {
        response.status(401).send('token invalido');
      }
      next();
    });
}

module.exports.logar = function(request, response) {
  function logar(usuario) {
    if(!usuario) {
      falhar();
    }
    if(!bcrypt.compareSync(request.body.senha, usuario.senha)) {
      falhar();
    }
    else {
      let token = jwt.sign(usuario, 'secret');
      response.status(200).json({
        message : "Autenticado com sucesso",
        token : token,
        usuarioId: usuario._id
      });  
    }
  }

  function falhar() {
      response.status(401).send("usuario não autorizado!!!");    
  }

  Usuario.findOne({email : request.body.email}).exec().then(logar, falhar);
}

