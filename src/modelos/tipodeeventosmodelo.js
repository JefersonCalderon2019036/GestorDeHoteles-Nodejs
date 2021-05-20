const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TipoDeEventoSchema = Schema({
    nombre: String,
    detalles: String
})

module.exports = mongoose.model('TipoDeEventos', TipoDeEventoSchema)