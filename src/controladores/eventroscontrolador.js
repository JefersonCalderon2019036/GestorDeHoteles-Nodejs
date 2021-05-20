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

}

module.exports = {
    AgregarEvento
}