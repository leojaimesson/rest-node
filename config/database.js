var mongoose = require('mongoose');
 
module.exports = function(uri){
  mongoose.connect(uri);
  mongoose.connection.on('connected',() => console.log("Estamos conectados em " + uri));
  mongoose.connection.on('disconnected',() => console.log("Desconectado em " + uri));
  mongoose.connection.on('error',() => console.log("Houve erro em  " + uri));
  mongoose.set('debug',true);
}