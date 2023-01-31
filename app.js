//Falta documentar y organizar todo

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const cRouter = require('./routes/c');

const queryRouter = require('./routes/query');
const Query2 = require('./routes/query2');


const configUsuarioRouter = require('./routes/configUsuario');
const configTrabajadorRouter = require('./routes/configTrabajador');
const usuarioCambiarDirRouter = require('./routes/usuarioCambiarDir');
const usuarioCambiarMPRouter = require('./routes/usuarioCambiarMP');
const trabajadorCambiarServicioRouter = require('./routes/trabajadorCambiarServicio');
const usuarioCambiarContrasenaRouter = require('./routes/usuarioCambiarContrasena');
const trabajadorCambiarContrasenaRouter = require('./routes/trabajadorCambiarContrasena');
const ingresarRouter = require('./routes/ingresar');
const ingresarUsuarioRouter = require('./routes/ingresarUsuario');
const ingresarTrabajadorRouter = require('./routes/ingresarTrabajador');
const usuarioRouter = require('./routes/usuario');
const trabajadorRouter = require('./routes/trabajador');

const startRouter = require('./routes/start');
const registrarRouter = require('./routes/registrar');
const registrarUsuarioRouter = require('./routes/registrarUsuario');
const registrarUsuario2Router = require('./routes/registrarUsuario2');
const registrarTrabajadorRouter = require('./routes/registrarTrabajador');
const solicitudServicioRouter = require('./routes/solicitudServicio');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/c', cRouter);

app.use('/ejecutar_query', queryRouter);
app.use('/Query2',Query2);
app.use('/configUsuario', configUsuarioRouter);
app.use('/configTrabajador', configTrabajadorRouter);
app.use('/usuarioCambiarDir', usuarioCambiarDirRouter);
app.use('/usuarioCambiarMP', usuarioCambiarMPRouter);
app.use('/usuarioCambiarContrasena', usuarioCambiarContrasenaRouter);
app.use('/trabajadorCambiarContrasena', trabajadorCambiarContrasenaRouter);
app.use('/trabajadorCambiarServicio', trabajadorCambiarServicioRouter);

app.use('/start', startRouter);
app.use('/registrar', registrarRouter);
app.use('/registrarUsuario', registrarUsuarioRouter);
app.use('/ingresar', ingresarRouter)
app.use('/ingresarUsuario', ingresarUsuarioRouter);
app.use('/ingresarTrabajador', ingresarTrabajadorRouter);
app.use('/usuario', usuarioRouter);
app.use('/trabajador', trabajadorRouter);
app.use('/registrarUsuario2', registrarUsuario2Router);
app.use('/registrarTrabajador', registrarTrabajadorRouter);
app.use('/solicitudServicio', solicitudServicioRouter);

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
