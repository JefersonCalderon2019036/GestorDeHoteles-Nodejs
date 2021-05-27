'use strict'

// IMPORTACIONES
const Hoteles = require("../modelos/hotelesmodelo");
const Usuario = require('../modelos/usuariomodelo');
const Eventos = require("../modelos/eventosmodelo");
const TipoDeEvento = require('../modelos/tipodeeventosmodelo')

function AgregarEvento(req, res) {
    var Eventosmodelo = new Eventos();
    var params = req.body;
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }

    Eventos.findOne({ $or: [{ nombre: params.nombre }] }).exec((err, EventoEncontrado) => {
        if (err) res.status(500).send({ Advertencia: "Error en la peticón de busqueda" })
        if (err) console.log("Error en la petición de busqueda")

        if (EventoEncontrado) {
            res.status(500).send({ Advertencia: "Este evento ya existe" })
            console.log("Este evento ya existe")
        } else {
            Hoteles.findOne({ $or: [{ _id: params.iddelhotel }] }).exec((err, HotelEncontrado) => {
                if (err) res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
                if (err) console.log("Error en la petición de busqueda")
                if (HotelEncontrado) {
                    TipoDeEvento.findOne({ $or: [{ nombre: params.tipodeevento }] }).exec((err, TipoDeEventoEncontrado) => {
                        if (err) res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
                        if (err) console.log("Error en la petición de busqueda")
                        if (TipoDeEventoEncontrado) {
                            Eventosmodelo.nombre = params.nombre;
                            Eventosmodelo.iddelhotel = HotelEncontrado._id;
                            Eventosmodelo.tipodeevento = TipoDeEventoEncontrado._id;
                            Eventosmodelo.cantidadepersonas = params.cantidadepersonas;
                            Eventosmodelo.detalles = params.detalles;
                            Eventosmodelo.imagen = params.imagen;
                            Eventosmodelo.valor = params.valor;
                            Eventosmodelo.save((err, EventoGuardado) => {
                                if (err) return res.status(500).send({ Advertencia: "Error en la petición de guardado" })
                                if (err) console.log("Error en la petición de guardado")
                                if (!EventoGuardado) return res.status(500).send({ Mensaje: "No se pudo guardar el evento" })
                                if (!EventoGuardado) console.log("No se pudo guardar el evento")
                                res.status(200).send({ EventoGuardado })
                            })
                        } else {
                            res.status(500).send({ Advertencia: "No se pudo encontrar en tipo de evento" })
                            console.log("No se pudo encontrar el tipo de evento")
                        }
                    })
                } else {
                    res.status(500).send({ Advertencia: "No se pudo encontrar el hotel del evento" })
                    console.log("No se pudo encontrar el hotel del evento")
                }
            })
        }
    })
}

function VerTodosLosDeEventos(req, res) {
    Eventos.find().exec((err, eventosencontrados) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (!eventosencontrados) return res.status(500).send({ Advertencia: "No se encontro eventos" })
        if (!eventosencontrados) console.log("No se encontro eventos")
        res.status(200).send({ eventosencontrados })
    })
}

function VerEventoPorId(req, res) {
    var idDelEvento = req.params.idDelEvento;
    Eventos.findOne({ $or: [{ _id: idDelEvento }] }).exec((err, EventoEncontrado) => {
        if (err) res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (!EventoEncontrado) return res.status(500).send({ Mensaje: "No se encontro eventos" })
        if (!EventoEncontrado) console.log("No se encontro eventos")
        res.status(200).send({ EventoEncontrado })
    })
}

function VerEventosPorHotel(req, res) {
    var IdDelEvento = req.params.IdDelEvento;
    Eventos.find({ $or: [{ iddelhotel: IdDelEvento }] }).exec((err, EventoEncontrado) => {
        if (err) console.log("Error en la petición de busqueda")
        if (!EventoEncontrado) return res.status(500).send({ Mensaje: "No se encontro eventos" })
        if (!EventoEncontrado) console.log("No se encontro eventos")
        res.status(200).send({ EventoEncontrado })
    })
}

function EditarEvento(req, res) {
    var params = req.body;
    var idDelEvento = req.params.idDelEvento;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }

    Eventos.findOneAndUpdate(idDelEvento, params, { new: true }, (err, EventoActualizado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de para editar" })
        if (err) console.log("Error en la petición de para editar")
        if (!EventoActualizado) return res.status(500).send({ Advertencia: "No se pudo eliminar el hotel" })
        if (!EventoActualizado) console.log("No se pudo eliminar el hotel")
        res.status(200).send({ EventoActualizado })
    })
}

function EliminarEvento(req, res) {
    var idDelEvento = req.params.idDelEvento;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }

    Eventos.findOneAndDelete(idDelEvento, (err, EliminarEvento) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de eliminación" })
        if (err) console.log("Error en la petición de eliminación")
        if (!EliminarEvento) return res.status(500).send({ Mensaje: "No se pudo eliminar el evento" })
        if (!EliminarEvento) console.log("No se pudo eliminar el evento")
        res.status(200).send({ EliminarEvento })
    })
}

module.exports = {
    AgregarEvento,
    VerTodosLosDeEventos,
    VerEventoPorId,
    VerEventosPorHotel,
    EditarEvento,
    EliminarEvento
}