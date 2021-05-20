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
            Hoteles.findOne({ $or: [{ nombre: params.hotel }] }).exec((err, HotelEncontrado) => {
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

function VerTodosLosTiposDeEventos(req, res) {
    Eventos.find().exec((err, eventosencontrados) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (!eventosencontrados) return res.status(500).send({ Advertencia: "No se encontro eventos" })
        if (!eventosencontrados) console.log("No se encontro eventos")
        res.status(500).send({ eventosencontrados })
    })
}

module.exports = {
    AgregarEvento,
    VerTodosLosTiposDeEventos
}