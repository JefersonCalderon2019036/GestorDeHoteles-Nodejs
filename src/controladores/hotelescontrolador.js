'use strict'

// IMPORTACIONES
const Hoteles = require("../modelos/hotelesmodelo")
const Usuario = require('../modelos/usuariomodelo');

function RegistrarHoteles(req, res) {
    const idUsuario = req.params.idUsuario;
    var params = req.body;
    var HotelesModelo = new Hoteles();

    Usuario.findOne({ _id: idUsuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en petición de busqueda")

        if (usuarioEncontrado.rol == "ROL_ADMIN") {
            Hoteles.findOne({ nombre: params.nombre }, (err, hotelencontrado) => {
                if (err) res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
                if (err) console.log("Error en la petición de busqueda")

                if (!hotelencontrado) {
                    HotelesModelo.nombre = params.nombre;
                    HotelesModelo.email = params.email;
                    HotelesModelo.pais = params.pais;
                    HotelesModelo.ciudad = params.ciudad;
                    HotelesModelo.direccion = params.direccion;
                    HotelesModelo.Telefonos = params.Telefonos;
                    HotelesModelo.imagenes = params.imagenes;
                    HotelesModelo.save((err, hotelguardado) => {
                        if (err) return res.status(500).send({ Advertencia: "Error en la petición de guardado" })
                        if (err) console.log("Error en la petición de guardado")
                        if (!hotelguardado) return res.status(500).send({ Advertencia: "El hotel no pudo guardarse" })
                        if (!hotelguardado) console.log("El hotel no pudo guardarse")
                        return res.status(500).send({ hotelguardado })
                    })
                } else {
                    console.log("El Hotel ya existe")
                    res.status(500).send({ Advertencia: "El Hotel ya existe" })
                }
            })
        } else {
            console.log("Solo un usuario administrado puede registrar hoteles")
            res.status(500).send({ Advertencia: "Solo un usuario administrado puede registrar hoteles" })
        }
    })

}

function EditarHotel(req, res) {
    const idHotel = req.params.idHotel;
    var params = req.body;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }
    Hoteles.findByIdAndUpdate(idHotel, params, { new: true }, (err, hotelactualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición' });
        if (err) console.log('Error en la petición')
        if (!hotelactualizado) return res.status(500).send({ Advertencia: "No se pudo actualizar los datos del hotel" })
        if (!hotelactualizado) console.log("No se pudo actualizar los datos del hotel")
        return res.status(500).send({ hotelactualizado })
    })
}

function VerTodosLosHoteles(req, res) {
    Hoteles.find().exec((err, hotelencontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (hotelencontrado && hotelencontrado.length >= 1) {
            res.status(200).send({ hotelencontrado })
        } else {
            console.log("No se encontro ningun hotel")
            res.status(500).send({ Advertencia: "No se encontro ningun hotel" })
        }
    })
}

function VerSoloUnHotel(req, res) {
    const idHotel = req.params.idHotel;
    Hoteles.findOne({ _id: idHotel }, (err, hotelencontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (hotelencontrado) {
            res.status(200).send({ hotelencontrado })
        } else {
            console.log("No se encontro ningun hotel")
            res.status(500).send({ Advertencia: "No se encontro ningun hotel" })
        }
    })
}

function VerHotelesPorPais(req, res) {
    var params = req.body;
    Hoteles.find({ $or: [{ pais: params.pais }] }).exec((err, hotelencontrado) => {
        if (err) return res.status(500).send({ Advertencia: "A ocurrido un error en la busqueda" })
        if (err) console.log("A ocurrido un error en la busqueda")
        if (hotelencontrado && hotelencontrado.length >= 1) {
            res.status(200).send({ hotelencontrado })
        } else {
            console.log("No se encontro ningun hotel")
            res.status(500).send({ Advertencia: "No se encontro ningun hotel" })
        }
    })
}

function VerHotelesPorCiudad(req, res) {
    var params = req.body;
    Hoteles.find({ $or: [{ ciudad: params.ciudad }] }).exec((err, hotelencontrado) => {
        if (err) return res.status(500).send({ Advertencia: "A ocurrido un error en la busqueda" })
        if (err) console.log("A ocurrido un error en la busqueda")
        if (hotelencontrado && hotelencontrado.length >= 1) {
            res.status(200).send({ hotelencontrado })
        } else {
            console.log("No se encontro ningun hotel")
            res.status(500).send({ Advertencia: "No se encontro ningun hotel" })
        }
    })
}

function EliminarUnHotel(req, res) {
    const idUsuario = req.params.idUsuario;
    const idHotel = req.params.idHotel;

    Usuario.findOne({ _id: idUsuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en petición de busqueda")

        if (usuarioEncontrado.rol == "ROL_ADMIN") {

            Hoteles.findByIdAndDelete(idHotel, (err, hoteleliminado) => {
                if (err) return res.status(500).send({ Advertencia: "Error en la petición de eliminación" })
                if (err) console.log("Error en la petición de eliminación")
                if (!hoteleliminado) return res.status(500).send({ Advertencia: "No se pudo eliminar el hotel" })
                if (!hoteleliminado) console.log("No se pudo eliminar el hotel")
                res.status(500).send({ Advertencia: "El hotel fue eliminado" })
            })

        } else {
            console.log("Solo un usuario administrado puede eliminar la información hoteles")
            res.status(500).send({ Advertencia: "Solo un usuario administrado puede eliminar la información hoteles" })
        }
    })
}

module.exports = {
    RegistrarHoteles,
    EditarHotel,
    VerTodosLosHoteles,
    VerSoloUnHotel,
    VerHotelesPorPais,
    VerHotelesPorCiudad,
    EliminarUnHotel
}