'use strict'

const mongoose = require("mongoose");
const app = require('./src/app/app');
const Usuario = require('./src/modelos/usuariomodelo');
const Hotel = require('./src/modelos/hotelesmodelo')
const bcrypt = require("bcrypt-nodejs");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/GestorDeHotelesDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Se encuentra conectado a la base de datos');
    console.log('Se encuentra conectado en el puerto 3000');

    app.listen(3000, function() {
        var usuarioModel = new Usuario();
        var hotelmodel = new Hotel();
        Usuario.find({
            $or: [{ usuario: "Admin" },
                { email: "Admin" }
            ]
        }).exec((err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' });

            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return console.log('El usuario ya existe')
            } else {
                bcrypt.hash("123456", null, null, (err, passbcrypt) => {
                    usuarioModel.nombre = "Admin";
                    usuarioModel.usuario = "Admin";
                    usuarioModel.email = "Admin";
                    usuarioModel.password = passbcrypt;
                    usuarioModel.imagen = "https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?size=338&ext=jpg";
                    usuarioModel.rol = "ROL_ADMIN";

                    usuarioModel.save((err, usuarioguardado) => {
                        if (err) console.log("Error en la peticion al guardar el usuario administrador");
                        if (usuarioguardado) {
                            Hotel.find({
                                $or: [{ nombre: "Hotel por defecto" },
                                    { email: "Hotelpordefecto@gmail.com" },
                                    { pais: "Guatemala" }
                                ]
                            }).exec((err, hotelguardado) => {
                                if (err) console.log("Error en la peticion al guardar el hotel por defecto");
                                if (hotelguardado) {
                                    hotelmodel.nombre = "Hotel por defecto";
                                    hotelmodel.email = "Hotelpordefecto@gmail.com";
                                    hotelmodel.pais = "Guatemala";
                                    hotelmodel.ciudad = "Guatemala";
                                    hotelmodel.direccion = "Guatemala, Guatemala";
                                    hotelmodel.Telefonos = "3621013";
                                    hotelmodel.imagenes = "https://www.caracteristicas.co/wp-content/uploads/2018/07/guatemala-5-e1574033836183.jpg"
                                    hotelmodel.save((err, hotelguardado) => {
                                        if (err) console.log("Error en la segunda de guardado");
                                        if (!hotelguardado) console.log("No se a guardado el hotel");
                                        console.log(usuarioguardado);
                                        console.log(hotelguardado);
                                    })
                                } else {
                                    console.log({ mensaje: "No se a guardado la empresa por defecto" });
                                }
                            })
                        } else {
                            console.log({ mensaje: "No se a guardado su usuario" });
                        }
                    })
                })
            }
        })
    })

}).catch(err => console.log(err))