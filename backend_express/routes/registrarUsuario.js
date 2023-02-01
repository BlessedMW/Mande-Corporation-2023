var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');
const { application } = require('express');

router.get('/', function (req, res, next)
{
    res.render('registrarUsuario', { title: 'Express' });
});


router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      console.log("Ha pasado por aquí");
      console.log(req.body);
      if (req.body.boton == "continuar")
      {
        client.query(`INSERT INTO Cliente VALUES ('${req.body.celular}', '${req.body.nombre}', '${req.body.apellido}', '${req.body.password}', '${req.body.direccion}', '${req.body.correoE}');`, function (err, result) {
          
          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.render('registrarUsuario2', { cel: req.body.celular});
        });
      }
      else
      {
        res.render('start', { title: 'Express' });
      }
    });
  
  })

module.exports = router;
