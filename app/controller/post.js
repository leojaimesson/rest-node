let Post = require('../models/post.js');
let jwt = require('jsonwebtoken');

module.exports.listarPosts = function(request, response) {
  let promise = Post.find().populate('usuario').exec();

  promise.then(
    (posts) => (response.status(200).json(posts)),
    (erro) => (response.status(500).json(erro))
  );
}

module.exports.pegarPost = function(request, response) {
  let id = request.params.id;  
  let promise = Post.findById(id).populate('usuario').exec();
  
  promise.then(
    (post) => {
      if(post) response.status(200).json(post);
      response.status(404).send("post nao encontrado");
    },
    (erro) => (response.status(500).send(erro))
  );
}

module.exports.inserirPost = function(request, response) {
  let id = jwt.decode(request.query.token)._doc._id;
  let post = new Post({
    texto : request.body.texto,
    likes : request.body.likes,
    usuario : id
  })
  let promise = Post.create(post);
  
  promise.then(
    (post) => (response.status(201).json(post)),
    (erro) => (response.status(500).json(erro))
  );
}

module.exports.atualizarPost = function(request, response) {
  let idU = jwt.decode(request.query.token)._doc._id;
  let id = request.params.id;

  let post = new Post({
    texto : request.body.texto,
    likes : request.body.likes,
    usuario : idU,
    _id : id
  });

  if(post.usuario == idU) {
    let promise = Post.findByIdAndUpdate(id, post).exec();
    promise.then(
      (post) => (response.status(200).json(post)),
      (erro) => (response.status(500).json(erro))
    );
  }
  else {
    response.status(401).send("operação invalida");
  }

   
}

module.exports.removerPost = function(request, response) {

  let id = request.params.id;
  let idU = jwt.decode(request.query.token)._doc._id;

  let promise = Post.findById(id).exec();

  promise.then(
    (post) => {
      if(post.usuario == idU){
        let p = Post.findByIdAndRemove(id).exec();

        p.then(
          (post) => (response.status(200).json(post)),
          (erro) => (response.status(500).json(erro))
        );
      }
      else {
        response.status(401).send("operacao invalida!");
      }
    },
    (erro) => (response.status(500).json(erro))
  );
}

module.exports.usuarioDePost = function(request, response) {
  let id = request.params.id;
  let promise = Post.findById(id).populate('usuario').exec();

  promise.then(
    (post) => {
      if(post) response.status(200).json(post.usuario);
      response.status(404).send("post nao existe");
    },
    (erro) => (response.status(500).json(erro))
  ) 
}