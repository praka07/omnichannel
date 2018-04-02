var express = require('express');
var app = express();
var path    = require("path");

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/design.html'));
  // console.log("directName"+__dirname);
}).listen(3000,()=>{
    console.log("server is running with port 7080");
});