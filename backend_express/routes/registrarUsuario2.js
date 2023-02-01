var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');
const { application } = require('express');

router.get('/', function (req, res, next)
{
    res.render('registrarUsuario2', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      console.log("Ha pasado por aquí");
      console.log(req.body);
      if (req.body.boton == "registro")
      {
        client.query(`INSERT INTO Tarjeta VALUES ('${req.body.radioB}', '${req.body.numero}', '${req.body.codigo}', '${req.body.celular}');`, function (err, result) {

          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.render('ingresarUsuario', { title: 'Express' });
        });
      }
      else
      {
        res.render('registrarUsuario', { title: 'Express' });
      }
    });
  
  })

module.exports = router;