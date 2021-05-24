const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TipoDeHabitacion = Schema({
    nombre: String,
    detalles: String
})

module.exports = mongoose.model('TipoDeHabitacion', TipoDeHabitacion)