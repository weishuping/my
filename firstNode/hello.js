// var name = 'world';

// var s = `hello, ${name}!`;

// console.log(s);
'use strict';
// var s = 'hello';
// function greet(name) {
//     console.log(s+','+name+'!');
// }
// module.exports = greet;
var http = require('http');
var path = require('path');

var workDir = path.resolve('.');
console.log(workDir);
var server = http.createServer(function(request, response){
    console.log(request.method+','+request.url);

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>hello</h1>运行 node hello.js /D:/workspace/my/firstNode');
});

server.listen(8089);