'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/app'));

app.get('/', function(req,res){
    res.render('index');
});

app.listen(port, function(){
    console.log('Express server listening on http://localhost:' + port);
});
