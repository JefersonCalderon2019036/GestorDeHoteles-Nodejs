const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservacioneSchema = Schema({
    FechaInicio: Date,
    FechaSalida: Date,
    IdHotel: String,
    IdHabitacion: String,
    IdEvento: String,
    valor: Number,
    cancelado: String
})

module.exports = mongoose.model('Reservaciones', ReservacioneSchema)