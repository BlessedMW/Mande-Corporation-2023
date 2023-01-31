var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');
const { application } = require('express');

router.get('/', function (req, res, next)
{
    res.render('trabajadorCambiarServicio', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      console.log(req.body);
      console.log("Agregar labor");
      if (req.body.boton == "agrego")
      {
            client.query(`INSERT INTO Servicio VALUES ('${req.body.celular}', '${req.body.nombre}', '${req.body.descripcion}');`, function (err, result) {
				
            done(err);
            if (err) {
              return console.error('error running query', err);
            }
            console.log("Se agregó una nueva labor a este trabajador");
            res.render('trabajador', {celular: req.body.celular});
          });
      }
      else
      {
        res.render('configTrabajador', {celular: req.body.celular});
      }
    });
  
  })

module.exports = router;