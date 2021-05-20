const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HotelesShema = Schema({
    nombre: String,
    email: String,
    pais: String,
    ciudad: String,
    direccion: String,
    Telefonos: String,
    imagenes: String
})

module.exports = mongoose.model('Hoteles', HotelesShema)