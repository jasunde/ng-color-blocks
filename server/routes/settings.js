var config = require('../config');
var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = new pg.Pool(config.pg);

router.get('/:user_name', function (req, res) {
  pool.query(
    'SELECT * FROM color_blocks_users AS users '+
    'JOIN color_blocks_settings AS settings ON users.id = settings.user_id'+
    ' WHERE users.user_name = $1',
    [req.params.user_name]
  )
    .then(function (result) {
      res.send(result.rows)
    })
    .catch(function (err) {
      console.log('GET settings error:', err);
      res.sendStatus(500)
    });
});

router.post('/:id', function (req, res) {
  pool.query(
    'UPDATE color_blocks_settings '+
    'SET colors = $1 '+
    'WHERE user_id = $2',
    [req.body.colors, req.params.id]
  )
    .then(function (result) {
      res.sendStatus(204);
    })
    .catch(function (err) {
      console.log('UPDATE settings error:', err);
      res.sedStatus(500);
    });
});


module.exports = router;
