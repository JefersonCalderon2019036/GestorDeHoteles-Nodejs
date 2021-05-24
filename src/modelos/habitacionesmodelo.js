const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HabitacionesSchema = Schema({
    IdHotel: String,
    TipoHabitacion: String,
    nombre: String,
    Cuartos: Number,
    cantidadepersonas: Number,
    detalles: String,
    imagen: String,
    valor: Number,
    listaComentarios: [{
        textoComentario: String,
        calificacionhabitacion: Number,
        calificacionservicio: Number,
        idUsuarioComentario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
    }],
    calificacionstandarhabitaciones: Number,
    calificacionstandarservicio: Number,
    calificacionstandar: Number,
    contador: Number
})

module.exports = mongoose.model('Habitaciones', HabitacionesSchema)