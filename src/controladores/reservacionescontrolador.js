'use strict'
const Reservaciones = require("../modelos/reservacionesmodelo")
const Hoteles = require("../modelos/hotelesmodelo")
const Habitacion = require("../modelos/habitacionesmodelo")
const Eventos = require("../modelos/eventosmodelo");
const moment = require('moment');

function AgregarReservacion(req, res) {
    var params = req.body;
    var ReservacionesModelo = new Reservaciones();
    //id de la reservacion y del usuario
    const IdReservacion = req.params.IdReservacion;
    const idUsuario = req.params.idUsuario;
    // metodo donde se consigue la fecha de hoy
    var hoy = moment();

    //verificacion de las habitaciones reservadas a traves de su id y su estado
    Reservaciones.findOne({ $or: [{ IdHabitacion: IdReservacion }, { cancelado: "RESERVADO" }] }).exec((err, HabitacionEncontrada) => {
        if (err) return res.status(500).send({ Advertencia: "A ocurrido un error en la busqueda" })
        if (err) console.log("A ocurrido un error en la busqueda")
            //verificacion si existe una reservacion
        if (HabitacionEncontrada) {
            //respuesta si la habitacion esta reservada
            res.status(500).send({ Advertencia: "No se pude realizar reservaciones ya que ya existe una pendiente" })
        } else {
            //verificacion si el evento esta resevado a traves de su id y su estado
            Reservaciones.findOne({ $or: [{ IdEvento: IdReservacion }, { cancelado: "RESERVADO" }] }).exec((err, EventoEncontrado) => {
                if (err) return res.status(500).send({ Advertencia: "A ocurrido un error en la busqueda" })
                if (err) console.log("A ocurrido un error en la busqueda")
                    //verificacion si existe una reservacion
                if (EventoEncontrado) {
                    //respuesta si el evento esta completo y esta reservado
                    res.status(500).send({ Advertencia: "No se pude realizar reservaciones ya que ya existe una pendiente" })
                } else {
                    //busqueda de la informacion para realizar una nueva reservaciones
                    //se busca la habitacion a traves de el id para traer sus datos y
                    //completar la informacion integrada de la reservacion
                    //y poner el estado de la habitacion en Resarvado
                    Habitacion.findOne({ $or: [{ _id: IdReservacion }] }).exec((err, HabitacionEncontrada2) => {
                        if (err) return res.status(500).send({ Advertencia: "A ocurrido un error en la busqueda" })
                        if (err) console.log("A ocurrido un error en la busqueda")

                        if (HabitacionEncontrada2) {
                            // se crea la reservacion
                            ReservacionesModelo.FechaDeReservacion = hoy;
                            var fechainicio = new Date(params.FechaInicio);
                            ReservacionesModelo.FechaInicio = fechainicio;
                            var fechasalida = new Date(params.FechaSalida);
                            ReservacionesModelo.FechaSalida = fechasalida;
                            ReservacionesModelo.IdHotel = HabitacionEncontrada2.IdHotel;
                            ReservacionesModelo.IdHabitacion = HabitacionEncontrada2._id;
                            ReservacionesModelo.IdUsuario = idUsuario;
                            ReservacionesModelo.valor = HabitacionEncontrada2.valor;
                            ReservacionesModelo.cancelado = "RESERVADO";
                            // se verifica si se guardo la informacion correctamente
                            ReservacionesModelo.save((err, ReservacionGuardada) => {
                                if (err) return res.status(500).send({ Advertencia: "A ocurrido un erro en la petición de guardado" })
                                if (err) console.log("A ocurrido un erro en la petición de guardado")
                                    //respuesta si no se pudo realizar el guardado
                                if (!ReservacionGuardada) return res.status(200).send({ mensaje: "No se ha podido guardar tu reservación" })
                                if (!ReservacionGuardada) console.log("No se ha podido guardar tu reservación")
                                    //respuesta si la reservacion se pudo guardar
                                res.status(200).send({ ReservacionGuardada })
                            })
                        } else {
                            //busqueda de la informacion para realizar una nueva reservaciones
                            //se busca el evento a traves de el id para traer sus datos y
                            //completar la informacion integrada de la reservacion
                            //y poner el estado del evento en Resarvado
                            Eventos.findOne({ $or: [{ _id: IdReservacion }] }).exec((err, EventoEncontrado2) => {
                                if (err) return res.status(500).send({ Advertencia: "A ocurrido un erro en la petición de guardado" })
                                if (err) console.log("A ocurrido un erro en la petición de guardado")

                                if (EventoEncontrado2) {
                                    // se crea la reservacion
                                    ReservacionesModelo.FechaDeReservacion = hoy;
                                    var fechainicio = new Date(params.FechaInicio);
                                    ReservacionesModelo.FechaInicio = fechainicio;
                                    var fechasalida = new Date(params.FechaSalida);
                                    ReservacionesModelo.FechaSalida = fechasalida;
                                    ReservacionesModelo.IdHotel = EventoEncontrado2.IdHotel;
                                    ReservacionesModelo.IdEvento = EventoEncontrado2._id;
                                    ReservacionesModelo.IdUsuario = idUsuario;
                                    ReservacionesModelo.valor = EventoEncontrado2.valor;
                                    ReservacionesModelo.cancelado = "RESERVADO";
                                    // se verifica si se guardo la informacion correctamente
                                    ReservacionesModelo.save((err, ReservacionGuardada) => {
                                        if (err) return res.status(500).send({ Advertencia: "A ocurrido un erro en la petición de guardado" })
                                        if (err) console.log("A ocurrido un erro en la petición de guardado")
                                            //respuesta si no se pudo realizar el guardado
                                        if (!ReservacionGuardada) return res.status(200).send({ mensaje: "No se ha podido guardar tu reservación" })
                                        if (!ReservacionGuardada) console.log("No se ha podido guardar tu reservación")
                                            //respuesta si la reservacion se pudo guardar
                                        res.status(200).send({ ReservacionGuardada })
                                    })
                                } else {
                                    res.status(500).send({ Advertencia: "No se pude realizar una reservacion ya que no existe ningun evento ni una habitacion" })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function CancelarReservacion(req, res) {
    const IdReservacion = req.params.IdReservacion;
    // metodo para la edicion del estado de la reservacion este se 
    // activa cuando se cancela la reservacion
    // o ya sea que ya haya paso su tiempo
    Reservaciones.findOneAndUpdate({ _id: IdReservacion }, { "cancelado": "CANCELADO" }, { new: true, useFindAndModify: false }, (err, comentarioEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de editacion' });
        if (!comentarioEditado) return res.status(500).send({ mensaje: 'Error en la peticion de editacion' });
        return res.status(200).send({ comentarioEditado })
    })
}

function EditarReservacion(req, res) {
    const IdReservacion = req.params.IdReservacion;
    var params = req.body;
    var fechainicio = new Date(params.FechaInicio);
    var fechasalida = new Date(params.FechaSalida);
    if (fechainicio == !null) {
        Reservaciones.findOneAndUpdate({ _id: IdReservacion }, { FechaInicio: fechainicio }, { new: true, useFindAndModify: false }, (err, comentarioEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de editacion' });
            if (!comentarioEditado) return res.status(500).send({ mensaje: 'Error en la peticion de editacion' });
            return res.status(200).send({ comentarioEditado })
        })
    } else {
        Reservaciones.findOneAndUpdate({ _id: IdReservacion }, { FechaSalida: fechasalida }, { new: true, useFindAndModify: false }, (err, comentarioEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de editacion' });
            if (!comentarioEditado) return res.status(500).send({ mensaje: 'Error en la peticion de editacion' });
            return res.status(200).send({ comentarioEditado })
        })
    }
}

function EliminarReservacion(req, res) {
    const IdReservacion = req.params.IdReservacion;
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }
    Reservaciones.findByIdAndDelete(IdReservacion, (err, EliminarReservacion) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición de Eliminar' })
        if (err) console.log("Error en la petición de eliminar")
        if (!EliminarReservacion) return res.status(500).send({ Advertencia: "No se a podido eliminar la reservación" })
        if (!EliminarReservacion) console.log("No se a podido eliminar la reservación")
        res.status(200).send({ EliminarReservacion })
    })
}

function VerTodosLasReservacionesActivasAdministrador(req, res) {
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }
    Reservaciones.find({ $or: [{ cancelado: "RESERVADO" }] }).exec((err, ReservacionesEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (ReservacionesEncontrado && ReservacionesEncontrado.length >= 1) {
            res.status(200).send({ ReservacionesEncontrado })
        } else {
            console.log("No se encontro ninguna reservación")
            res.status(500).send({ Advertencia: "No se encontro ninguna reservación" })
        }
    })
}

function VerTodasLasReservacionesCanceladasAdministrador(req, res) {
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }
    Reservaciones.find({ $or: [{ cancelado: "CANCELADO" }] }).exec((err, ReservacionesEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (ReservacionesEncontrado && ReservacionesEncontrado.length >= 1) {
            res.status(200).send({ ReservacionesEncontrado })
        } else {
            console.log("No se encontro ninguna reservación")
            res.status(500).send({ Advertencia: "No se encontro ninguna reservación" })
        }
    })
}

function VerTodosLasReservacionesActivas(req, res) {
    const idUsuario = req.params.idUsuario;
    Reservaciones.find({ $or: [{ IdUsuario: idUsuario }, { cancelado: "RESERVADO" }] }).exec((err, ReservacionesEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (ReservacionesEncontrado && ReservacionesEncontrado.length >= 1) {
            res.status(200).send({ ReservacionesEncontrado })
        } else {
            console.log("No se encontro ninguna reservación")
            res.status(500).send({ Advertencia: "No se encontro ninguna reservación" })
        }
    })
}

function VerTodasLasReservacionesCanceladas(req, res) {
    const idUsuario = req.params.idUsuario;
    Reservaciones.find({ $or: [{ IdUsuario: idUsuario }, { cancelado: "CANCELADO" }] }).exec((err, ReservacionesEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (ReservacionesEncontrado && ReservacionesEncontrado.length >= 1) {
            res.status(200).send({ ReservacionesEncontrado })
        } else {
            console.log("No se encontro ninguna reservación")
            res.status(500).send({ Advertencia: "No se encontro ninguna reservación" })
        }
    })
}

function VerReservacionesPorUsuario(req, res) {
    const idUsuario = req.params.idUsuario;
    Reservaciones.find({ $or: [{ IdUsuario: idUsuario }] }).exec((err, ReservacionesEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (ReservacionesEncontrado && ReservacionesEncontrado.length >= 1) {
            res.status(200).send({ ReservacionesEncontrado })
        } else {
            console.log("No se encontro ninguna reservación")
            res.status(500).send({ Advertencia: "No se encontro ninguna reservación" })
        }
    })
}

function VerTodasLasReservaciones(req, res) {
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo puede eliminar el Administrador.' })
    }
    Reservaciones.find().exec((err, ReservacionesEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en la petición de busqueda")
        if (ReservacionesEncontrado && ReservacionesEncontrado.length >= 1) {
            res.status(200).send({ ReservacionesEncontrado })
        } else {
            console.log("No se encontro ninguna reservación")
            res.status(500).send({ Advertencia: "No se encontro ninguna reservación" })
        }
    })
}

module.exports = {
    AgregarReservacion,
    CancelarReservacion,
    EliminarReservacion,
    VerTodosLasReservacionesActivas,
    VerTodasLasReservacionesCanceladas,
    VerReservacionesPorUsuario,
    VerTodasLasReservaciones,
    EditarReservacion,
    VerTodasLasReservacionesCanceladasAdministrador,
    VerTodosLasReservacionesActivasAdministrador
}