var express = require('express');
var app = express();
var path    = require("path");

app.get('/omnichannel/selection', function (req, res) {
    res.sendFile(path.join(__dirname+'/design.html'));
  // console.log("directName"+__dirname);
}).listen(process.env.PORT || 3000,()=>{
    console.log("server is running with port 7080");
});