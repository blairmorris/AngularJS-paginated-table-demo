'use strict';

var express = require('express');
var app = express();

app.use(express.static('app'));

app.listen(9004, '0.0.0.0', function(){
    console.log('Express server listening on 9004');
});
