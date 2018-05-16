let mongoose = require('mongoose');

module.exports = function() {
  let schema = mongoose.Schema({
    texto : {
      type: String,
      require: true
    },
    likes : {
      type : Number,
      require: true
    },
    usuario :  {
      type: mongoose.Schema.ObjectId,
      ref: 'Usuario'
    }
  });
  return mongoose.model('Post', schema);
}(); 