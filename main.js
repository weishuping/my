//阻塞代码示例
/*var fs = require("fs");

var data = fs.readFileSync("package.json");

console.log(data.toString());
 console.log('end');*/

//非阻塞代码
/*var fs = require("fs");

fs.readFile('package.json',function(err, data){
	if (err) return console.error(err);
	console.log('haha');
});

console.log('end');*/

//Node.js 事件循环
//引入events模块
/*var events = require('events');
//创建eventEmitter对象
var eventEmitter = new events.EventEmitter();
//创建事件处理程序
var connectHandler = function connected() {
	console.log('连接成功');
	//触发data_received事件
	eventEmitter.emit('data_received');
}
//绑定connection事件处理程序
eventEmitter.on('connection',connectHandler);
//使用匿名函数绑定data_received 事件
eventEmitter.on('data_received',function(){
	console.log('数据接收成功');
});
//触发connection事件
eventEmitter.emit('connection');
console.log("程序执行完毕");*/

//EventEmitter类
/*//EventEmitter的核心就是事件触发和事件监听器功能的封装
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('some_event',function(){
	console.log('some_Events 事件触发');
});
setTimeout(function(){eventEmitter.emit('some_event');}, 1000);*/

//EventEmitter 的每个事件由一个事件名和若干参数组成，
//EventEmitter 支持若干个事件监听器

/*var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('someEvent', function(arg1, arg2) {
	console.log('1', arg1, arg2);
});
emitter.on('someEvent', function(arg1, arg2) {
	console.log('2', arg1, arg2);
})

emitter.emit('someEvent', arg1, arg2);*/

//实例。演示EventEmitter类的应用（方法，类方法，事件）
var events = require('events');
var eventEmitter = new events.EventEmitter();

//监听1
var listener1 = function listener1() {
	console.log('监听1 执行');
}
//监听2
var listener2 = function listener2() {
	console.log('监听2 执行');
}
//绑定 connection 事件，处理函数为listener1
eventEmitter.addListener('connection',listener1);
//绑定 connection 事件，处理函数为listener2
eventEmitter.on('connection',listener2);
//处理connection事件
eventEmitter.emit('connection');
//移除监听的listener1函数
eventEmitter.removeListener('connection', listener1);
console.log('listener1 不再监听');
//触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + '个监听连接事件');
