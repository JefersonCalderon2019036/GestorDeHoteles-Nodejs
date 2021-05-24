'use strict'
const TipoDeEvento = require('../modelos/tipodeeventosmodelo')
const Usuario = require('../modelos/usuariomodelo');

function AgregarTipoEvento(req, res) {
    const TipoDeEventoModelo = new TipoDeEvento();
    var params = req.body;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }


    TipoDeEvento.findOne({ $or: [{ nombre: params.nombre }] }).exec((err, TipoDeEventoEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")

        if (TipoDeEventoEncontrado) {
            res.status(500).send({ Advertencia: "No se encontro tipo de evento con ese nombre" })
            console.log("No se encontro tipo de evento con ese nombre")
        } else {
            TipoDeEventoModelo.nombre = params.nombre;
            TipoDeEventoModelo.detalles = params.detalles;

            TipoDeEventoModelo.save((err, TipoDeEventosGuardados) => {
                if (err) return res.status(500).send({ Advertencia: "Error en la petición de guardado" })
                if (err) console.log("Error en la petición de guardado")
                if (!TipoDeEventosGuardados) return res.status(500).send({ Advertencia: "No se pudo guardar el tipo de eventos" })
                if (!TipoDeEventosGuardados) console.log("No se pudo guardar el tipo de eventos")
                res.status(200).send({ TipoDeEventosGuardados })
            })
        }
    })
}

function EditarTipoEvento(req, res) {
    var params = req.body;
    const idTipoDeEvento = req.params.idTipoDeEvento;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }

    TipoDeEvento.findByIdAndUpdate(idTipoDeEvento, params, { new: true }, (err, TipoDeEventoActualizado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de guardado" })
        if (err) console.log("Error en la petición de guardado")
        if (!TipoDeEventoActualizado) return res.status(500).send({ Advertencia: "No se pudo actualizar la información del tipo de evento" })
        if (!TipoDeEventoActualizado) console.log("No se pudo actualizar la información de el tipo de evento")
        res.status(200).send({ TipoDeEventoActualizado })
    })
}

function VerTipoDeEvento(req, res) {
    TipoDeEvento.find((err, TipoDeEventoEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (!TipoDeEventoEncontrado) return res.status(500).send({ Advertencia: "No se pudo encontrar ningun tipo de de evento" })
        if (!TipoDeEventoEncontrado) console.log("No se pudo encontrar ningun tipo de evento")
        res.status(200).send({ TipoDeEventoEncontrado })
    })
}

function VerTipoDeEventoPorNombre(req, res) {
    var params = req.body;
    TipoDeEvento.findOne({ $or: [{ nombre: params.nombre }] }).exec((err, TipoDeEventoEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (!TipoDeEventoEncontrado) return res.status(500).send({ Advertencia: "No se encontro tipo de evento con ese nombre" })
        if (!TipoDeEventoEncontrado) console.log("No se encontro tipo de evento con ese nombre")
        res.status(200).send({ TipoDeEventoEncontrado })
    })
}

function EliminarTipoDeEvento(req, res) {
    var params = req.params.idTipoDeEvento;
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }

    TipoDeEvento.findByIdAndDelete(params, (err, TipoDeEventoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición de Eliminar' })
        if (err) console.log("Error en la petición de eliminar")
        if (!TipoDeEventoEliminado) return res.status(500).send({ Advertencia: "No se a podido eliminar el tipo de evento" })
        if (!TipoDeEventoEliminado) console.log("No se a podido eliminar el tipo de evento")
        res.status(200).send({ TipoDeEventoEliminado })
    })
}

module.exports = {
    AgregarTipoEvento,
    EditarTipoEvento,
    VerTipoDeEvento,
    VerTipoDeEventoPorNombre,
    EliminarTipoDeEvento
}