var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var settings = require('./routes/settings');
var users = require('./routes/users');

app.use(bodyParser.json());

// Routes
app.use('/settings', settings);
app.use('/users', users);

// Serve back static files
app.use(express.static('./server/public'));

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
})

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
