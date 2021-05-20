const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventoShema = Schema({
    nombre: String,
    iddelhotel: String,
    tipodeevento: String,
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
    calificacionstandar: Number
})

module.exports = mongoose.model('Eventos', EventoShema)