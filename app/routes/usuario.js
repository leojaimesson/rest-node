let controller = require('../controller/usuario.js');
let auth = require ('../controller/auth.js');
module.exports = function(app) {
  app.post('/api/usuarios/singin', auth.logar)
     .post('/api/usuarios', controller.inserirUsuario)
     .use('/api/usuarios', auth.checar)
     .get('/api/usuarios', controller.listarUsuarios)
     .get('/api/usuarios/:id', controller.pegarUsuario)
     .put('/api/usuarios/', controller.atualizarUsuario)
     .delete('/api/usuarios/', controller.removerUsuario)
     .get('/api/usuarios/:id/posts', controller.postsDeUsuario);
}