let controller = require('../controller/post.js');
let auth = require('../controller/auth.js');

module.exports = function(app) {
  app.use('/api/posts/', auth.checar)
     .get('/api/posts', controller.listarPosts)
     .get('/api/posts/:id', controller.pegarPost)
     .post('/api/posts', controller.inserirPost)
     .put('/api/posts/:id', controller.atualizarPost)
     .delete('/api/posts/:id', controller.removerPost)
     .get('/api/posts/:id/usuario', controller.usuarioDePost);

}