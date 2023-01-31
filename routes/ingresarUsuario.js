var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');
const { application } = require('express');

router.get('/', function (req, res, next)
{
    res.render('ingresarUsuario', { title: 'Express' });
});

router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      console.log(req.body);
      if (req.body.boton == "iniciar")
      {


        client.query(`SELECT COUNT(*) FROM Cliente WHERE celular = CONCAT('${req.body.numTelefono}') AND passwordC = CONCAT('${req.body.password}')`, function (err, result) {
          
          if ((JSON.parse(JSON.stringify(result.rows))[0]).count == '1')
          {
                res.render('usuario', { celular: req.body.numTelefono });
                console.log("Ingreso");

          }
          else
          {
            res.render('ingresarUsuario', { title: 'Express' });
            console.log("Contraseña incorrecta");
          }

          done(err);
          if (err) {
            return console.error('error running query', err);
          }
          
        });
      }
      else
      {
        res.render('inicio', { title: 'Express' });
      }
    });
  
  })

module.exports = router;