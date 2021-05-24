'use strict'

// IMPORTACIONES
const TipoDeHabitacion = require("../modelos/tipodehabitacion")

function AgregarTipoDeHabitacion(req, res) {
    var params = req.body;
    var TipoDeHabitacionModelo = new TipoDeHabitacion();

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }

    TipoDeHabitacion.findOne({ $or: [{ nombre: params.nombre }] }).exec((err, TipoDeHabitacionEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")

        if (TipoDeHabitacionEncontrado) {
            res.status(500).send({ Advertencia: "Este tipo de habitación ya existe" })
            console.log("Este tipo de habitación ya existe")
        } else {
            TipoDeHabitacionModelo.nombre = params.nombre;
            TipoDeHabitacionModelo.detalles = params.detalles;

            TipoDeHabitacionModelo.save((err, TipoDeHabitacionGuardada) => {
                if (err) return res.status(500).send({ Advertencia: "Error en la petición de guardado" })
                if (err) console.log("Error en la petición de guardado")
                if (!TipoDeHabitacionGuardada) return res.status(500).send({ Advertencia: "No se pudo guardar el tipo de eventos" })
                if (!TipoDeHabitacionGuardada) console.log("No se pudo guardar el tipo de eventos")
                res.status(200).send({ TipoDeHabitacionGuardada })
            })
        }

    })
}

function VerLosTiposDeHabitacion(req, res) {
    TipoDeHabitacion.find((err, TipoDeHabitacionEncontrada) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (!TipoDeHabitacionEncontrada) return res.status(500).send({ Advertencia: "No se encontro ningun tipo de habitacion" })
        if (!TipoDeHabitacionEncontrada) console.log("No se encontro ningun tipo de habitacion")
        res.status(200).send({ TipoDeHabitacionEncontrada })
    })
}

function VerTipoDeHabitacionPorNombre(req, res) {
    var params = req.body;
    TipoDeHabitacion.findOne({ $or: [{ nombre: params.nombre }] }).exec((err, TipoDeHabitacionEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (!TipoDeHabitacionEncontrado) return res.status(500).send({ Advertencia: "No se encontro ningun tipo de habitacion" })
        if (!TipoDeHabitacionEncontrado) console.log("No se encontro ningun tipo de habitacion")
        res.status(200).send({ TipoDeHabitacionEncontrado })
    })
}

function EditarTipoDeHabitacionporid(req, res) {
    var params = req.body;
    const IdTipoDeHabitacion = req.params.IdTipoDeHabitacion;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }

    TipoDeHabitacion.findByIdAndUpdate(IdTipoDeHabitacion, params, { new: true }, (err, TipoDeHabitacionActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!TipoDeHabitacionActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el tipo de habitación' });
        res.status(200).send({ TipoDeHabitacionActualizado })
    })
}

function EliminarTipoDeHabitacion(req, res) {
    const idHotel = req.params.IdTipoDeHabitacion;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }

    TipoDeHabitacion.findByIdAndDelete(idHotel, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición de Eliminar' })
        if (err) console.log("Error en la petición de eliminar")
        if (!usuarioEliminado) return res.status(500).send({ mensaje: 'No se pudo eliminar el tipo de habitación correctamente' })
        if (!usuarioEliminado) console.log('No se pudo eliminar el tipo de habitación correctamente')
        return res.status(200).send({ mensaje: "Se ha eliminado el tipo de habitación con el id:" + idHotel })
    })
}

module.exports = {
    AgregarTipoDeHabitacion,
    VerLosTiposDeHabitacion,
    VerTipoDeHabitacionPorNombre,
    EditarTipoDeHabitacionporid,
    EliminarTipoDeHabitacion
}