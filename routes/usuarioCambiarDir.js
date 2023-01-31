var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');
const { application } = require('express');

router.get('/', function (req, res, next)
{
    res.render('usuarioCambiarDir', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      console.log(req.body);
      console.log("Cambio de dirección del usuario");
      if (req.body.boton == "cambio")
      {

            client.query(`UPDATE Cliente SET direccion = '${req.body.direccion}' WHERE celular = '${req.body.celular}'`, function (err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            done(err);
            if (err) {
              return console.error('error running query', err);
            }
            console.log("Cambio hecho con exito");
            res.render('usuario', {celular: req.body.celular});
          });
      }
      else
      {
        res.render('configUsuario', {celular: req.body.celular});
      }
    });
  
  })

module.exports = router;