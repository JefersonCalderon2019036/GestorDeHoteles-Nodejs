const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String,
    rol: String,
    imagen: String,
    telefono: String
})

module.exports = mongoose.model('Usuarios', UsuarioSchema)