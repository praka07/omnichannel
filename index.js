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

app.post('/webhook', (req, res) => {  
 
    let body = req.body;
  
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  
  });

app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running");
});
