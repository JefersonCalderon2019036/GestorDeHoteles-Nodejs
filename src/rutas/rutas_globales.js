"use strict"

//Exportaciones
const express = require("express");

//Rutas
//localhost:3000/api/<<funcion>>
var api = express.Router();

//importacion de controladores
const usuarioControlador = require("../controladores/usuariocontrolador")
const controladrohoteles = require("../controladores/hotelescontrolador")
const TipoEventoControler = require("../controladores/tipodeeventocontrolador")
const ControladoEventos = require("../controladores/eventroscontrolador")

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
api.delete("/EliminarTipoDeEventoPorNombre/:idUsuario", md_autenticacion.ensureAuth, TipoEventoControler.EliminarTipoDeEventoPorNombre)

// RUTAS DEL CONTROLADOR DE EVENTOS
api.post("/AgregarEvento/:idUsuario", md_autenticacion.ensureAuth, ControladoEventos.AgregarEvento)

// RUTAS DEL CONTROLADOR DE HABITACIONES


// RUTAS DEL CONTROLADOR DE RESERVACIONES


module.exports = api;