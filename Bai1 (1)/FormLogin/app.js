const http = require("http");
const fs = require("fs");
const queryString = require('query-string');
const hostname = "localhost"
const port = 8080;
const server = http.createServer((res, req) => {
    const form = `
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <style>
        @import url(https://fonts.googleapis.com/css?family=Raleway:300,400,600);
        body{
            margin: 0;
            font-size: .9rem;
            font-weight: 400;
            line-height: 1.6;
            color: #212529;
            text-align: left;
            background-color: #f5f8fa;
        }
        
        .navbar-laravel
        {
            box-shadow: 0 2px 4px rgba(0,0,0,.04);
        }
        
        .navbar-brand , .nav-link, .my-form, .login-form
        {
            font-family: Raleway, sans-serif;
        }
        
        .my-form
        {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }
        
        .my-form .row
        {
            margin-left: 0;
            margin-right: 0;
        }
        
        .login-form
        {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }
        
        .login-form .row
        {
            margin-left: 0;
            margin-right: 0;
        }
    </style>
    <main class="login-form">
        <div class="cotainer">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Login</div>
                        <div class="card-body">
                            <form action="http://localhost:8080/" method="post">
                                <div class="form-group row">
                                    <label for="username" class="col-md-4 col-form-label text-md-right">Username</label>
                                    <div class="col-md-6">
                                        <input type="text"  id="username" class="form-control" name="username" required autofocus>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                    <div class="col-md-6">
                                        <input type="password"  id="password" class="form-control" name="password" required>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-6 offset-md-4">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox"> Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                    <a href="#" class="btn btn-link">
                                        Forgot Your Password?
                                    </a>
                                </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
    `
    var isLogin = false;
    res.on("data", function (data) {
        let arr = queryString.parse(data + " ");
        var username = arr.username;
        var password = arr.password;
        let result = fs.readFileSync('user.txt');
        result = JSON.parse(result)
        result.forEach(item => {
            isLogin = arr.username === item.username && arr.password === item.password
        })
    })
    res.on("end", function () {
        console.log(isLogin);
        req.statusCode = 200;
        req.setHeader("Content-type", "text/html");
        if (isLogin > 0) {
            req.end("success")
        } else {
            req.end(form)
        }
    })

});

server.listen(port, hostname, () => {
    console.log(`server running: http://${hostname}:${port}`);
})