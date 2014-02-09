/**
 * Created by zhangye on 14-2-9.
 */
//var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response){
    console.log("Request Handler 'start' was called.");

    /*
    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }

    sleep(10000);
    */
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload" multiple="multiple"/>'+
        '<input type="submit" value="Upload File" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
    console.log("Request Handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.uploadDir = "D:\\Temp Pics";
    console.log("About to parse");
    form.parse(request, function (error, fields, files){
        console.log("Parsing Done");
        fs.renameSync(files.upload.path, "D:\\Temp Pics\\temp.jpg");

        response.writeHead(200, {"Content-Type":"text/html"});
        response.write("Received Image:<br/>");
        response.write("<img src='/show'/> ");

        response.end();
    });

}

function show(response){
    console.log("Request Handler 'show' was called.")
    //D:\Temp Pics\Koala.jpg
    fs.readFile("D:\\Temp Pics\\temp.jpg","binary", function(error, file){
        if(error){
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(error + "\n");
            response.end();
        }else{
            response.writeHead(200, {"Content-Type":"image/jpg"});
            response.write(file,"binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
