var express = require('express');
var myParser = require("body-parser");

var path    = require("path");
var app = express();
app.use(myParser.json());
app.get('/omnichannel/selection', function (req, res) {
    res.sendFile(path.join(__dirname+'/design.html'));
  });
app.get('/ominichannel/selection/:uriValue',function(req,res){

    console.log(`request URI:::${req.params.uriValue}`);
  

});
app.post('/postpayload',function(req,res){
   
    console.log(`payload :::${JSON.stringify(req.body)}`);
});
app.get('/omnichannel/facebook/webhook',function(req,res){
    let challenge = req.query['hub.challenge'];
    console.log(`challenge::${challenge}`);
    res.send(challenge);
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running");
});
