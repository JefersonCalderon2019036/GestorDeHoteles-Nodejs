const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservacioneSchema = Schema({
    FechaDeReservacion: Date,
    FechaInicio: Date,
    FechaSalida: Date,
    cantidaddedias: Number,
    IdHotel: String,
    IdHabitacion: String,
    IdEvento: String,
    IdUsuario: String,
    valor: Number,
    cancelado: String
})

module.exports = mongoose.model('Reservaciones', ReservacioneSchema)