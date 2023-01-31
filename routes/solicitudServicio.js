var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');
const { application } = require('express');

router.get('/', function (req, res, next)
{
    res.render('solicitudServicio', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      console.log("Solicitud de Servicio");
      console.log(req.body);
      if (req.body.boton == "filtrar")
      {
        client.query(`SELECT celular, nombreServicio, descPagos FROM Servicio WHERE nombreServicio LIKE CONCAT('%','${req.body.filtro}','%');`, function (err, result) {

          console.log(req.body.filtro);
          console.log(JSON.stringify(result.rows));

          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          res.render('solicitudServicio', { lista: JSON.stringify(result.rows), celular: req.body.celular});
        });
      }
      else if (req.body.boton == "volver")
      {
        res.render('usuario', {celular: req.body.celular});
      }
    });
  
  })

module.exports = router;