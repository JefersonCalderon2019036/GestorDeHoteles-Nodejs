'use strict'

// IMPORTACIONES
const TipoDeHabitacion = require('../modelos/tipodehabitacion')
const Habitacion = require("../modelos/habitacionesmodelo")
const Hoteles = require("../modelos/hotelesmodelo")

function AgregarUnHabitacion(req, res) {
    var params = req.body;
    var HabitacionModelo = new Habitacion();
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }
    Habitacion.findOne({ nombre: params.nombre }, (err, HabitacionEncontrada) => {
        if (err) res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")

        if (!HabitacionEncontrada) {
            TipoDeHabitacion.findOne({ nombre: params.TipoHabitacion }, (err, TipoDeHabitacionEncontrada) => {
                if (err) res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
                if (err) console.log("Error en la petición de busqueda")

                if (!TipoDeHabitacionEncontrada) return res.status(200).send({ Advertencia: "Su tipo de habitación no existe" })
                if (!TipoDeHabitacionEncontrada) console.log("Su tipo de habitación no existe")

                Hoteles.findOne({ _id: params.IdHotel }, (err, HotelEncontrado) => {
                    if (err) res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
                    if (err) console.log("Error en la petición de busqueda")

                    if (!HotelEncontrado) return res.status(200).send({ Advertencia: "Su hotel no existe en esta base de datos" })
                    if (!HotelEncontrado) console.log("Su hotel no existe en esta base de datos")

                    HabitacionModelo.IdHotel = HotelEncontrado._id;
                    HabitacionModelo.TipoHabitacion = TipoDeHabitacionEncontrada._id;
                    HabitacionModelo.nombre = params.nombre;
                    HabitacionModelo.Cuartos = params.Cuartos;
                    HabitacionModelo.cantidadepersonas = params.cantidadepersonas;
                    HabitacionModelo.detalles = params.detalles;
                    HabitacionModelo.valor = params.valor;
                    HabitacionModelo.imagen = params.imagen;

                    HabitacionModelo.save((err, HabitacionGuardada) => {
                        if (err) return res.status(500).send({ Advertencia: "Error en la petición de guardado" })
                        if (err) console.log("Error en la petición de guardado")
                        if (!HabitacionGuardada) return res.status(200).send({ Advertencia: "La habitación no pudo guardarse" })
                        if (!HabitacionGuardada) console.log("La habitación no pudo guardarse")
                        return res.status(200).send({ HabitacionGuardada })
                    })
                })
            })
        } else {
            console.log("Esta habitación ya existe")
            res.status(200).send({ mensaje: "Esta habitación ya existe" })
        }
    })

}

function VerTodasLasHabitaciones(req, res) {
    Habitacion.find().exec((err, hotelencontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (hotelencontrado && hotelencontrado.length >= 1) {
            res.status(200).send({ hotelencontrado })
        } else {
            console.log("No se encontro ninguna habitación")
            res.status(200).send({ Advertencia: "No se encontro ninguna habitación" })
        }
    })
}


function VerHabitacionPorHotel(req, res) {
    var IdDeLaHabitacion = req.params.IdDeLaHabitacion;
    Habitacion.find({ $or: [{ IdHotel: IdDeLaHabitacion }] }).exec((err, hotelencontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (hotelencontrado && hotelencontrado.length >= 1) {
            res.status(200).send({ hotelencontrado })
        } else {
            console.log("No se encontro ninguna habitación")
            res.status(500).send({ Advertencia: "No se encontro ninguna habitación" })
        }
    })
}

function VerHabitacionPorid(req, res) {
    var IdDeLaHabitacion = req.params.IdDeLaHabitacion;
    Habitacion.findOne({ $or: [{ _id: IdDeLaHabitacion }] }).exec((err, HabitacionEncontrada) => {
        if (err) res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (!HabitacionEncontrada) return res.status(500).send({ Mensaje: "No se encontro eventos" })
        if (!HabitacionEncontrada) console.log("No se encontro eventos")
        res.status(200).send({ HabitacionEncontrada })
    })
}

function EditarHabitacion(req, res) {
    const IdDeLaHabitacion = req.params.IdDeLaHabitacion;
    var params = req.body;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }
    Habitacion.findByIdAndUpdate(IdDeLaHabitacion, params, { new: true }, (err, HabitacionActualizad) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición' });
        if (err) console.log('Error en la petición')
        if (!HabitacionActualizad) return res.status(500).send({ Advertencia: "No se pudo actualizar los datos del la habitación" })
        if (!HabitacionActualizad) console.log("No se pudo actualizar los datos del la habitación")
        return res.status(500).send({ HabitacionActualizad })
    })
}

function EliminarHabitacion(req, res) {
    const IdDeLaHabitacion = req.params.IdDeLaHabitacion;
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }
    Habitacion.findByIdAndDelete(IdDeLaHabitacion, (err, HabitacionEliminada) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de eliminación" })
        if (err) console.log("Error en la petición de eliminación")
        if (!HabitacionEliminada) return res.status(500).send({ Advertencia: "No se encotro habitación para eliminar" })
        if (!HabitacionEliminada) console.log("No se encotro habitación para eliminar")
        return res.status(200).send({ HabitacionEliminada })
    })
}

module.exports = {
    AgregarUnHabitacion,
    VerTodasLasHabitaciones,
    VerHabitacionPorHotel,
    VerHabitacionPorid,
    EditarHabitacion,
    EliminarHabitacion
}