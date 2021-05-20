'use strict'

// IMPORTACIONES
const Usuario = require('../modelos/usuariomodelo');
const bcrypt = require("bcrypt-nodejs");
const jwt = require('../servicios/jwt');

function login(req, res) {
    var params = req.body;
    Usuario.findOne({ email: params.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passCorrecta) => {
                if (passCorrecta) {
                    if (params.obtenerToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        });
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado })
                    }
                } else {
                    return res.status(404).send({ mensaje: 'El usuario no se ha podido identificar' })
                }
            })
        } else {
            return res.status(404).send({ mensaje: 'El usuario no ha podido ingresar' })
        }
    })
}


function registrar(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;
    console.log(params);
    if (params.usuario && params.email && params.password) {
        usuarioModel.nombre = params.nombre;
        usuarioModel.usuario = params.usuario;
        usuarioModel.email = params.email;
        usuarioModel.rol = 'ROL_USUARIO';
        usuarioModel.imagen = "https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?size=338&ext=jpg";
        Usuario.find({
            $or: [
                { usuario: usuarioModel.usuario },
                { email: usuarioModel.email }
            ]
        }).exec((err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })

            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El usuario ya existe' })
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;

                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) console.log('Error al guardar el Usuario')
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })

                        if (usuarioGuardado) {
                            res.status(200).send(usuarioGuardado)
                        } else {
                            console.log('No se ha podido registrar el Usuario')
                            res.status(500).send({ mensaje: 'No se ha podido registrar el Usuario' })
                        }
                    })
                })
            }
        })
    }
}

function obtenerUsuarioID(req, res) {
    var idUsuario = req.params.idUsuario
    Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del Usuario' })
        console.log(usuarioEncontrado.email);
        return res.status(200).send({ usuarioEncontrado })
    })
}

function obtenerUsuarios(req, res) {
    Usuario.find((err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Obtener Usuarios' })
        if (!usuariosEncontrados) return res.status(500).send({ mensaje: 'Error en la consulta de Usuarios' })

        return res.status(200).send({ usuariosEncontrados })

    })
}

function editarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    var params = req.body;
    delete params.password;
    if (idUsuario != req.user.sub) {
        return res.status(500).send({ mensaje: 'No posees los permisos necesarios para actulizar este Usuario.' });
    }

    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar al Usuario' });
        return res.status(200).send({ usuarioActualizado });
    })

}

function editarUsuarioADMIN(req, res) {
    var idUsuario = req.params.idUsuario;
    var params = req.body;
    delete params.password;
    if (req.user.rol != "ROL_ADMIN") {
        return res.status(500).send({ mensaje: "Solo el Administrador puede editarlos" })
    }
    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar al Usuario' });
        return res.status(200).send({ usuarioActualizado });
    })
}

function eliminarUsuario(req, res) {
    const idUsuario = req.params.idUsuario;
    if (idUsuario != req.user.sub) {
        return res.status(500).send({ mensaje: 'No posee los permisos para eliminar a este Usuario.' })
    }
    Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición de Eliminar' })
        if (err) console.log("Error en la petición de eliminar")
        if (!usuarioEliminado) return res.status(500).send({ mensaje: 'No se pudo eliminar el usuario correctamente' })
        if (!usuarioEliminado) console.log("No se pudo eliminar el usuario correctamente")
        return res.status(200).send({ mensaje: "Se ha eliminado el usuario con el id:" + idUsuario })
    })
}

function eliminarUsuarioAdmin(req, res) {
    const idUsuario = req.params.idUsuario;
    const idHotel = req.params.idHotel;

    Usuario.findOne({ _id: idUsuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ Advertencia: "Error en la petición de busqueda" })
        if (err) console.log("Error en petición de busqueda")

        if (usuarioEncontrado.rol == "ROL_ADMIN") {
            Usuario.findByIdAndDelete(idHotel, (err, usuarioEliminado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la petición de Eliminar' })
                if (err) console.log("Error en la petición de eliminar")
                if (!usuarioEliminado) return res.status(500).send({ mensaje: 'No se pudo eliminar el usuario correctamente' })
                if (!usuarioEliminado) console.log("No se pudo eliminar el usuario correctamente")
                return res.status(200).send({ mensaje: "Se ha eliminado el usuario con el id:" + idHotel })
            })
        } else {
            console.log("Solo un usuario administrado puede eliminar a otro usuario")
            res.status(500).send({ Advertencia: "Solo un usuario administrado puede eliminar a otro usuario" })
        }

    })
}

module.exports = {
    login,
    registrar,
    obtenerUsuarios,
    obtenerUsuarioID,
    editarUsuario,
    editarUsuarioADMIN,
    eliminarUsuario,
    eliminarUsuarioAdmin
}