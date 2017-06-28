//导入koa, 和koa1.0 不同，我们导入的是一个class,因此用大写表示
const Koa = require('koa');
//创建一个Koa对象表示web app本身
const app = new Koa();

//对于任何请求，app将调用改异步函数处理请求；
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(3000);