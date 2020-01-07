var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path')

var server = http.createServer(function (request, response) {

    //获取输入的url解析后的对象
    var pathObj = url.parse(request.url == '/' ? '/demo.html' : request.url, false);
    // request.url表示的是输入的url除了域名后面的部分，http://localhost:8080/login.html?aa=001&bb=002即为/login.html?aa=001&bb=002
    // url.parse(request.url, true)表示的是将该url解析成一个对象。其中第二个参数默认false。
    // false的话，query对应的值 =>    'aa=001&bb=002'
    // true的话，query对应的值 =>{ aa: '001', bb: '002' }
    // 相当于将url中的参数进行了解析，以便后面的调用(pathObj.query.aa)



    //文件夹的绝对路径
    var staticPath = path.resolve(__dirname, '../dist-docs')
    if (/sss/.test(pathObj.pathname)) {
        // 拦截转发到http://192.168.2.10:8080/
        console.log(pathObj.pathname)
    } else {
        //获取资源文件绝对路径
        var filePath = path.join(staticPath, pathObj.pathname);
        // path.join()用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是/，Windows系统是\。

        //异步读取file
        fs.readFile(filePath, 'binary', function (err, fileContent) {
            if (err) {
                response.writeHead(404, 'not found')
                response.end('<h1>404 Not Found</h1>')
            } else {
                response.write(fileContent, 'binary')
                response.end()
            }
        })
    }



})
server.listen(1994)
console.log('在线文档已经生成，所有文件在dist-docs目录中')
console.log('start success! please visit: http://localhost:1994/')