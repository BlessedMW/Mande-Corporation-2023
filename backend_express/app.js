//Iniciales
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
//Query
const queryRouter = require('./routes/query');
const Query2 = require('./routes/query2');
//Index
const startRouter = require('./routes/start');
//Configuracion Usuario
const configUsuarioRouter = require('./routes/configUsuario');
const usuarioCambiarContrasenaRouter = require('./routes/usuarioCambiarContrasena');
const usuarioCambiarDirRouter = require('./routes/usuarioCambiarDir');
const usuarioCambiarMPRouter = require('./routes/usuarioCambiarMP');
//Configuracion Trabajador
const configTrabajadorRouter = require('./routes/configTrabajador');
const trabajadorCambiarContrasenaRouter = require('./routes/trabajadorCambiarContrasena');
const trabajadorCambiarServicioRouter = require('./routes/trabajadorCambiarServicio');
//Ingreso
const ingresarRouter = require('./routes/ingresar');
const ingresarUsuarioRouter = require('./routes/ingresarUsuario');
const ingresarTrabajadorRouter = require('./routes/ingresarTrabajador');
//Registro
const registrarRouter = require('./routes/registrar');
const registrarUsuarioRouter = require('./routes/registrarUsuario');
const registrarUsuario2Router = require('./routes/registrarUsuario2');
const registrarTrabajadorRouter = require('./routes/registrarTrabajador');
//Interfaces
const usuarioRouter = require('./routes/usuario');
const trabajadorRouter = require('./routes/trabajador');
//Solicitud de servicio
const solicitudServicioRouter = require('./routes/solicitudServicio');
//Express
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); //Uso de la plantilla pug
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
//Query
app.use('/ejecutar_query', queryRouter);
app.use('/Query2',Query2);
//Index
app.use('/start', startRouter);
//Configuracion Usuario
app.use('/configUsuario', configUsuarioRouter);
app.use('/usuarioCambiarContrasena', usuarioCambiarContrasenaRouter);
app.use('/usuarioCambiarDir', usuarioCambiarDirRouter);
app.use('/usuarioCambiarMP', usuarioCambiarMPRouter);
//Configuracion Trabajador
app.use('/configTrabajador', configTrabajadorRouter);
app.use('/trabajadorCambiarContrasena', trabajadorCambiarContrasenaRouter);
app.use('/trabajadorCambiarServicio', trabajadorCambiarServicioRouter);
//Registro
app.use('/registrar', registrarRouter);
app.use('/registrarUsuario', registrarUsuarioRouter);
app.use('/registrarUsuario2', registrarUsuario2Router);
app.use('/registrarTrabajador', registrarTrabajadorRouter);
//Ingreso
app.use('/ingresar', ingresarRouter)
app.use('/ingresarUsuario', ingresarUsuarioRouter);
app.use('/ingresarTrabajador', ingresarTrabajadorRouter);
//Interfaces
app.use('/usuario', usuarioRouter);
app.use('/trabajador', trabajadorRouter);
//Solicitud de servicio
app.use('/solicitudServicio', solicitudServicioRouter);
//Funciones
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
