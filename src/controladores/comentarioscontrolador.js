'use strict'
const Eventos = require("../modelos/eventosmodelo");
const Habitacion = require("../modelos/habitacionesmodelo");

function AgregarComentarioEnEvento(req, res) {
    var params = req.body;
    var encuestaID = req.params.encuestaID;
    Eventos.findByIdAndUpdate(encuestaID, {
        $push: {
            listaComentarios: {
                textoComentario: params.textoComentario,
                calificacionhabitacion: params.calificacionhabitacion,
                calificacionservicio: params.calificacionservicio,
                idUsuarioComentario: encuestaID
            }
        }
    }, { new: true }, (err, comentarioAgregado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del comentario' });
        if (!comentarioAgregado) return res.status(500).send({ mensaje: 'Error al agregar el comentario a la encuesta' });
        return res.status(200).send({ comentarioAgregado });
    })
}

function AgregarComentarioDeHabitacion(req, res) {
    var params = req.body;
    var encuestaID = req.params.encuestaID;
    Habitacion.findByIdAndUpdate(encuestaID, {
        $push: {
            listaComentarios: {
                textoComentario: params.textoComentario,
                calificacionhabitacion: params.calificacionhabitacion,
                calificacionservicio: params.calificacionservicio,
                idUsuarioComentario: encuestaID
            }
        }
    }, { new: true }, (err, comentarioAgregado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del comentario' });
        if (!comentarioAgregado) return res.status(500).send({ mensaje: 'Error al agregar el comentario a la encuesta' });
        return res.status(200).send({ comentarioAgregado });
    })
}

function editarComentarioEnEvento(req, res) {
    var encuestaID = req.params.encuestaID;
    var comentarioId = req.params.idComentario;
    var idUsuario = req.params.idUsuario;
    var params = req.body;

    Eventos.findOneAndUpdate({
            _id: encuestaID,
            "listaComentarios._id": comentarioId,
            'listaComentarios.idUsuarioComentario': idUsuario
        }, { "listaComentarios.$.textoComentario": params.textoComentario }, { new: true, useFindAndModify: false },
        (err, comentarioEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Comentario' });
            if (!comentarioEditado) return res.status(500).send({ mensaje: 'No posee los permisos para editar este comentario' });
            return res.status(200).send({ comentarioEditado })
        })
}

function editarComentarioEnHabitacion(req, res) {
    var encuestaID = req.params.encuestaID;
    var comentarioId = req.params.idComentario;
    var idUsuario = req.params.idUsuario;
    var params = req.body;

    Habitacion.findOneAndUpdate({
            _id: encuestaID,
            "listaComentarios._id": comentarioId,
            'listaComentarios.idUsuarioComentario': idUsuario
        }, { "listaComentarios.$.textoComentario": params.textoComentario }, { new: true, useFindAndModify: false },
        (err, comentarioEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Comentario' });
            if (!comentarioEditado) return res.status(500).send({ mensaje: 'No posee los permisos para editar este comentario' });
            return res.status(200).send({ comentarioEditado })
        })
}


function eliminarComentarioEnEvento(req, res) {
    var comentarioId = req.params.idComentario;

    Eventos.findOneAndUpdate({ "listaComentarios._id": comentarioId }, { $pull: { listaComentarios: { _id: comentarioId } } }, { new: true, useFindAndModify: false }, (err, comentarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Comentario' });
        if (!comentarioEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el Comentario' });

        return res.status(200).send({ comentarioEliminado })
    })

}

function eliminarComentarioEnHabitacion(req, res) {
    var comentarioId = req.params.idComentario;

    Habitacion.findOneAndUpdate({ "listaComentarios._id": comentarioId }, { $pull: { listaComentarios: { _id: comentarioId } } }, { new: true, useFindAndModify: false }, (err, comentarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Comentario' });
        if (!comentarioEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el Comentario' });

        return res.status(200).send({ comentarioEliminado })
    })
}


module.exports = {
    AgregarComentarioEnEvento,
    AgregarComentarioDeHabitacion,
    editarComentarioEnEvento,
    editarComentarioEnHabitacion,
    eliminarComentarioEnEvento,
    eliminarComentarioEnHabitacion
}