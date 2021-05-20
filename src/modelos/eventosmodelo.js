const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventoShema = Schema({
    IdHotel: String,
    TipoEvento: String,
    CantidadDePersonas: Number,
    detalles: String,
    valor: Number,
    listaComentarios: [{
        textoComentario: String,
        calificacionhabitacion: Number,
        calificacionservicio: Number,
        idUsuarioComentario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
    }],
    calificacionstandarhabitaciones: Number,
    calificacionstandarservicio: Number,
    calificacionstandar: Number
})

module.exports = mongoose.model('Eventos', EventoShema)