var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');
const { application } = require('express');

router.get('/', function (req, res, next)
{
    res.render('trabajadorCambiarContrasena', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      console.log(req.body);
      console.log("Cambio contraseña");
      if (req.body.boton == "cambio")
      {
        if (req.body.newPW == req.body.confirmPW)
        {
            client.query(`UPDATE Trabajador SET passwordT = '${req.body.newPW}' WHERE celular = '${req.body.celular}'`, function (err, result) {

            done(err);
            if (err) {
              return console.error('error running query', err);
            }
            console.log("Se cambió la contraseña");
            res.render('trabajador', {celular: req.body.celular});
          });
        }
        else
        {
            console.log("Las contraseñas no coinciden");
            res.render('trabajadorCambiarContrasena', {celular: req.body.celular});
        }
      }
      else
      {
        res.render('configTrabajador', {celular: req.body.celular});
      }
    });
  
  })

module.exports = router;