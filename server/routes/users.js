var config = require('../config');
var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = new pg.Pool(config.pg);

router.get('/', function (req, res) {
  pool.query(
    'SELECT * FROM color_blocks_users'
  )
    .then(function (result) {
      res.send(result.rows);
    })
    .catch(function (err) {
      console.log('GET users error:', err);
      res.sendStatus(500);
    });
});

router.get('/:user_name', function (req, res) {
  pool.query(
    'SELECT * FROM color_blocks_users AS users '+
    'JOIN color_blocks_settings AS settings ON users.id = settings.user_id '+
    'WHERE name = $1',
    [req.params.user_name]
  )
    .then(function (result) {
      res.send(result.rows);
    })
    .catch(function (err) {
      console.log('GET user error:', err);
      res.sendStatus(500);
    });
});

router.post('/', function (req, res) {
  var user_name = req.body.user_name;
  var user_id;

  pool.connect()
    .then(function (client) {
      client.query(
        'INSERT INTO color_blocks_users (name) '+
        'VALUES ($1)',
        [user_name]
      )
        .then(function (result) {
          // res.sendStatus(201);
          client.query( 'SELECT * FROM color_blocks_users WHERE name = $1', [user_name]
          )
            .then(function (result) {
              user_id = result.rows[0].id
              client.query(
                'INSERT INTO color_blocks_settings (user_id, colors) '+
                'VALUES ($1, $2)',
                [user_id, req.body.colors]
              )
                .then(function (result) {
                  client.release();
                  res.sendStatus(201);
                })
                .catch(function (err) {
                  console.log('INSERT settings error:', err);
                  res.sendStatus(500);
                });
            })
            .catch(function (err) {
              console.log('SELECT new user error:', err);
            });
        })
        .catch(function (err) {
          console.log('GET settings error:', err);
          res.sendStatus(500);
        });



    });
});




module.exports = router;
