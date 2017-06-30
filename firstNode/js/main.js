'use strict';
//引入hello模块
// var greet = require('./hello');
// var s = 'Michael';
// greet(s);
$('button').on('click', function() {
    $('ul').toggle();
});
$.getJSON('../test.json',function(data){
    console.log(data.name);
});