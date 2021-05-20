"use strict"

//Variables Globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors");

//Importaciones Rutas
const Rutas_Globales = require("../rutas/rutas_globales")

//Middlewars
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Cabeceras
app.use(cors());

//Carga de rutas
app.use("/api", Rutas_Globales);

//Exportar
module.exports = app;