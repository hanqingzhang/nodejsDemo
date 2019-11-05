const http = require("http");
const url = require("url");
const querystring = require('querystring');
const fs=require("fs")
let user={
    admin:123456
}
http
  .createServer((req, res) => {
    //获取数据
    let path, get, post;
    //path是请求路径，get是get方法的参数，post是post方法的参数
    if (req.method == "GET") {
      let { pathname, query } = url.parse(req.url, true);
      path = pathname;
      get = query;
      //拿到get的请求参数。todo
      complete();
    } else if (req.method == "POST") {
      let arr = [];
      path=req.url
      req.on("data", buffer => {
        arr.push(buffer);
      });
      req.on("end", () => {
        //Buffer.concat(arr).toString()二进制变字符串
        // querystring.parse处理成json
        post = querystring.parse(Buffer.concat(arr).toString());
        //拿到post的请求参数。todo
        complete();
      });
    }
    //处理登陆
    function complete() {
     
        if(path=="/login"){
            //登陆接口
            let{username,password}=get
            //判断数据库中有没名字，此处mock数据
            res.writeHead(200,{
                "Content-Type":"text/plain;charset=utf-8"
            })
            if(!user[username]){
              
                res.end(JSON.stringify({
                    err:1,
                    msg:"用户名不存在"
                }))
            }else if(user[username]!=password){
               
                res.end(JSON.stringify({
                    err:1,
                    msg:"密码错误"
                }))

            }else{
               
                res.end(JSON.stringify({
                    err:0,
                    msg:"登陆成功"
                }))

            }

        }else if(path=="/reg"){
            //注册接口
            let{username,password}=post
            res.writeHead(200,{
                "Content-Type":"text/plain;charset=utf-8"
            })
            if(user[username]){
                res.end(JSON.stringify({
                    err:1,
                    msg:"账户已经存在"
                }))

            }else{
                res.end(JSON.stringify({
                    err:0,
                    msg:"成功"
                }))

            }

        }else{
            fs.readFile('./www/login.html',(err,data)=>{
                if(err){
                    res.end("404")
    

                }else{
                    res.end(data)

                }

                

            })
        }
    }
  })
  .listen(8080);
