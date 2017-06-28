'use strict';

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');
//从命令行参数获取root目录，默认是当前目录；
var root = path.resolve(process.argv[2] || '.');
console.log('root is '+ root);

//创建服务器
var server = http.createServer(function(request, response) {

    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root,pathname);

    fs.stat(filepath, function(err, stats) {
        if(!err && stats.isFile()) {
            console.log('200' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response)
        } else if(!err && stats.isDirectory()) {
            //访问localhost:8080
            fs.readdir(filepath, function(err, files) {
                files.forEach(val=>{
                    if(val == 'index.html' || val == 'default.html') {
                        val = path.join(filepath, val);
                        response.writeHead(200);
                        fs.createReadStream(val).pipe(response);
                    }
                });
            });
        } else {
            //文件不存在
            console.log('404'+ request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });

});

server.listen(8080);