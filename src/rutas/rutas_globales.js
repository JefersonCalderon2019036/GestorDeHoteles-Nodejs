"use strict"

//Exportaciones
const express = require("express");

//Rutas
//localhost:3000/api/
var api = express.Router();

//importacion de controladores
const usuarioControlador = require("../controladores/usuariocontrolador")
const controladrohoteles = require("../controladores/hotelescontrolador")
const TipoEventoControler = require("../controladores/tipodeeventocontrolador")
const TipoDeHabitacionControlador = require("../controladores/tipodehabitacioncontrolador")
const ControladoEventos = require("../controladores/eventroscontrolador")
const HabitacionControlador = require("../controladores/habitacionescontrolador")
const ReservacionControlador = require("../controladores/reservacionescontrolador")
const ComentariosControlador = require("../controladores/comentarioscontrolador")

// MIDDLEWARE
var md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();

// RUTAS DEL LOGIN
api.post('/Login', usuarioControlador.login);

// RUTAS DEL CONTROLADOR USUARIO
api.post('/RegistrarUsuarios', usuarioControlador.registrar);
api.get('/VerTodosLosUsuarios', md_autenticacion.ensureAuth, usuarioControlador.obtenerUsuarios);
api.get('/VerSoloUnUsuarioId/:idUsuario', md_autenticacion.ensureAuth, usuarioControlador.obtenerUsuarioID);
api.put('/EditarUsuarios/:idUsuario', md_autenticacion.ensureAuth, usuarioControlador.editarUsuario);
api.put('/EditarUsuariosAdmin/:idUsuario', md_autenticacion.ensureAuth, usuarioControlador.editarUsuarioADMIN);
api.delete('/EliminarUsuarios/:idUsuario', md_autenticacion.ensureAuth, usuarioControlador.eliminarUsuario);
api.delete('/EliminarUsuariosAdmin/:idUsuario/:idHotel', md_autenticacion.ensureAuth, usuarioControlador.eliminarUsuarioAdmin);

// RUTAS DEL CONTROLADOR HOTEL
api.post("/RegistrarHotel/:idUsuario", md_autenticacion.ensureAuth, controladrohoteles.RegistrarHoteles)
api.put("/EditarHotel/:idUsuario/:idHotel", md_autenticacion.ensureAuth, controladrohoteles.EditarHotel)
api.get("/VerTodosLosHoteles", md_autenticacion.ensureAuth, controladrohoteles.VerTodosLosHoteles)
api.get("/VerSoloUnHotel/:idHotel", md_autenticacion.ensureAuth, controladrohoteles.VerSoloUnHotel)
api.get("/VerHotelesPorPais", controladrohoteles.VerHotelesPorPais);
api.get("/VerHotelesPorCiudad", controladrohoteles.VerHotelesPorCiudad);
api.delete("/EliminarUnHotel/:idUsuario/:idHotel", md_autenticacion.ensureAuth, controladrohoteles.EliminarUnHotel);

// RUTAS DEL CONTROLADOR TIPO DE EVENTOS
api.post("/CrearUnNuevoTipoDeEvento/:idUsuario", md_autenticacion.ensureAuth, TipoEventoControler.AgregarTipoEvento);
api.put("/EditarTipoEvento/:idUsuario/:idTipoDeEvento", md_autenticacion.ensureAuth, TipoEventoControler.EditarTipoEvento)
api.get("/VerTodosLosTiposDeEventos", md_autenticacion.ensureAuth, TipoEventoControler.VerTipoDeEvento)
api.get("/VerTipoDeEventoPorNombre", md_autenticacion.ensureAuth, TipoEventoControler.VerTipoDeEventoPorNombre)
api.delete("/EliminarTipoDeEvento/:idUsuario/:idTipoDeEvento", md_autenticacion.ensureAuth, TipoEventoControler.EliminarTipoDeEvento)

// RUTAS DEL CONTROLADOR DE EVENTOS
api.post("/AgregarEvento/:idUsuario", md_autenticacion.ensureAuth, ControladoEventos.AgregarEvento)
api.get("/VerTodosLosDeEventos", md_autenticacion.ensureAuth, ControladoEventos.VerTodosLosDeEventos)
api.get("/VerEventoPorNombre", md_autenticacion.ensureAuth, ControladoEventos.VerEventoPorNombre)
api.put("/EditarEvento/:idUsuario/:idDelEvento", md_autenticacion.ensureAuth, ControladoEventos.EditarEvento)
api.delete("/EliminarEvento/:idUsuario/:idDelEvento", md_autenticacion.ensureAuth, ControladoEventos.EliminarEvento)

//Rutas DEL CONTROLADRO TIPO DE HABITACIONES
api.post("/AgregarTipoDeHabitacion/:idUsuario", md_autenticacion.ensureAuth, TipoDeHabitacionControlador.AgregarTipoDeHabitacion)
api.get("/VerLosTiposDeHabitacion", md_autenticacion.ensureAuth, TipoDeHabitacionControlador.VerLosTiposDeHabitacion)
api.get("/VerTipoDeHabitacionPorNombre", md_autenticacion.ensureAuth, TipoDeHabitacionControlador.VerTipoDeHabitacionPorNombre)
api.put("/EditarTipoDeHabitacionporid/:idUsuario/:idHotel", md_autenticacion.ensureAuth, TipoDeHabitacionControlador.EditarTipoDeHabitacionporid)
api.delete("/EliminarTipoDeHabitacion/:idUsuario/:IdTipoDeHabitacion", md_autenticacion.ensureAuth, TipoDeHabitacionControlador.EliminarTipoDeHabitacion)

// RUTAS DEL CONTROLADOR DE HABITACIONES
api.post("/AgregarUnHabitacion/:idUsuario", md_autenticacion.ensureAuth, HabitacionControlador.AgregarUnHabitacion)
api.get("/VerTodasLasHabitaciones", md_autenticacion.ensureAuth, HabitacionControlador.VerTodasLasHabitaciones)
api.get("/VerHabitacionesPorTipoDeHabitacion", md_autenticacion.ensureAuth, HabitacionControlador.VerHabitacionesPorTipoDeHabitacion)
api.get("/VerHabitacionPorHotel", md_autenticacion.ensureAuth, HabitacionControlador.VerHabitacionPorHotel)
api.get("/VerHabitacionesPorConsto", md_autenticacion.ensureAuth, HabitacionControlador.VerHabitacionesPorConsto)
api.put("/EditarHabitacion/:idUsuario/:IdDeLaHabitacion", md_autenticacion.ensureAuth, HabitacionControlador.EditarHabitacion)
api.delete("/EliminarHabitacion/:idUsuario/:IdDeLaHabitacion", md_autenticacion.ensureAuth, HabitacionControlador.EliminarHabitacion)

// RUTAS DEL CONTROLADOR DE RESERVACIONES
api.post("/AgregarReservacion/:idUsuario/:IdReservacion", md_autenticacion.ensureAuth, ReservacionControlador.AgregarReservacion)
api.put("/CancelarReservacion/:idUsuario/:IdReservacion", md_autenticacion.ensureAuth, ReservacionControlador.CancelarReservacion)
api.put("/EditarReservacion/:idUsuario/:IdReservacion", md_autenticacion.ensureAuth, ReservacionControlador.EditarReservacion)
api.delete("/EliminarReservacion/:idUsuario/:IdReservacion", md_autenticacion.ensureAuth, ReservacionControlador.EliminarReservacion)
api.get("/VerTodosLasReservacionesActivasAdministrador/:idUsuario", md_autenticacion.ensureAuth, ReservacionControlador.VerTodosLasReservacionesActivasAdministrador)
api.get("/VerTodasLasReservacionesCanceladasAdministrador/:idUsuario", md_autenticacion.ensureAuth, ReservacionControlador.VerTodasLasReservacionesCanceladasAdministrador)
api.get("/VerTodosLasReservacionesActivas/:idUsuario", md_autenticacion.ensureAuth, ReservacionControlador.VerTodosLasReservacionesActivas)
api.get("/VerTodasLasReservacionesCanceladas/:idUsuario", md_autenticacion.ensureAuth, ReservacionControlador.VerTodasLasReservacionesCanceladas)
api.get("/VerReservacionesPorUsuario/:idUsuario", md_autenticacion.ensureAuth, ReservacionControlador.VerReservacionesPorUsuario)
api.get("/VerTodasLasReservaciones/:idUsuario", md_autenticacion.ensureAuth, ReservacionControlador.VerTodasLasReservaciones)

// RUTAS DEL CONTROLADOR DE COMENTARIOS EN EVENTOS
api.post("/AgregarComentarioEnEvento/:idUsuario/:encuestaID", md_autenticacion.ensureAuth, ComentariosControlador.AgregarComentarioEnEvento)
api.put("/editarComentarioEnEvento/:idUsuario/:encuestaID/:idComentario", md_autenticacion.ensureAuth, ComentariosControlador.editarComentarioEnEvento)
api.delete("/eliminarComentarioEnEvento/:idComentario", md_autenticacion.ensureAuth, ComentariosControlador.eliminarComentarioEnEvento)


// RUTAS DEL CONTROLADOR DE COMENTARIOS DE HABITACION
api.post("/AgregarComentarioDeHabitacion/:idUsuario/:encuestaID", md_autenticacion.ensureAuth, ComentariosControlador.AgregarComentarioDeHabitacion)
api.put("/editarComentarioEnHabitacion/:idUsuario/:encuestaID/:idComentario", md_autenticacion.ensureAuth, ComentariosControlador.editarComentarioEnHabitacion)
api.delete("/eliminarComentarioEnHabitacion/:idComentario", md_autenticacion.ensureAuth, ComentariosControlador.eliminarComentarioEnHabitacion)


module.exports = api;