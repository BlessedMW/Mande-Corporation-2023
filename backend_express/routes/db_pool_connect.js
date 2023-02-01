const Pool = require('pg-pool');
const fs = require('fs')

var config = require('./config')
console.log(config);
const pool = new Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
})

function query(text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

function connect(callback) {
  return pool.connect(callback);
};

module.exports = connect;