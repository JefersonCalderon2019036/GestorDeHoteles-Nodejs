const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HabitacionesSchema = Schema({
    IdHotel: String,
    TipoHabitacion: String,
    Cuartos: Number,
    detalles: String,
    valor: Number,
    listaComentarios: [{
        textoComentario: String,
        calificacionhabitacion: Number,
        calificacionservicio: Number,
        calificacionestandar: Number,
        idUsuarioComentario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
    }],
})

module.exports = mongoose.model('Habitaciones', HabitacionesSchema)