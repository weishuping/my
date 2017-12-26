var http = require('http');
//测试
http.createServer(function (request,response) {
	//发送HTTP头部
	//HTTP: 状态值 200 成功
	response.writeHead(200,{'Content-Type': 'text/plain'});
	//发送响应数据
	response.end('Hello World\n');
}).listen(7654);
console.log('Server running at 7654');
