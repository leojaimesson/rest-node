let Usuario = require('../models/usuario.js');
let Post = require('../models/post.js');
var bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


module.exports.listarUsuarios = function(request, response) {
  let promise = Usuario.find().exec();
  console.log(jwt.decode(request.query.token));

  promise.then(
    (usuarios) => response.status(200).json(usuarios),
    (error) => response.status(500).json(error)
  );
}

module.exports.pegarUsuario = function(request, response) {
  let id = request.params.id;
  
  let promise = Usuario.findById(id).exec();

  promise.then(
    (usuario) => {
      if(usuario) response.status(200).json(usuario);
      response.status(404).send("user not encontrado");
    },
    (erro) => response.status(500).json(erro)
  )
}

module.exports.inserirUsuario = function(request, response) {
  let usuario = new Usuario({
    nome : request.body.nome,
    email : request.body.email,
    senha : bcrypt.hashSync(request.body.senha, 10)
  });
  let promise = Usuario.create(usuario);

  promise.then(
    (usuario)  => response.status(201).json(usuario),
    (erro) => response.status(500).json(erro)
  );
}

module.exports.atualizarUsuario = function(request, response) {
  let id = jwt.decode(request.query.token)._doc._id;
  console.log("aqui -> " + id);
  let usuario = new Usuario({
    nome : request.body.nome,
    email : request.body.email,
    senha : bcrypt.hashSync(request.body.senha, 10),
    _id : request._id
  });
  
  let promise = Usuario.findByIdAndUpdate(id, request.body).exec();
  
  promise.then(
    (usuario) => (response.status(200).json(usuario)),
    (erro) => (response.status(500).json(erro))
  )
}

module.exports.removerUsuario = function(request, response) {
  let id = jwt.decode(request.query.token)._doc._id;
  let promise = Usuario.findByIdAndRemove(id).exec();
  
  promise.then(
    (usuario) => response.status(200).json(usuario),
    (erro) => response.status(405).json(erro)
  )
}

module.exports.postsDeUsuario = function(request, response) {
  let id = request.params.id;
  let promise = Post.find({"usuario": id}).exec();
  
  promise.then(
    (posts) => (response.status(200).json(posts)),
    (erro) => (response.status(500).json(erro))
  );
}