var express = require('express');
var myParser = require("body-parser");
var https = require('https');

var path    = require("path");
var app = express();
app.use(myParser.json());

var payload={
    "recipient": {
      "id": "1801362176551550"
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "hi, Mani",
          "buttons": [
            {
              "type": "web_url",
              "url": "https://www.messenger.com",
              "title": "seat selection"
            }
          ]
        }
      }
    }
  };


var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(payload, 'utf8')
};
var optionspost = {
    host : 'graph.facebook.com',
    port : 443,
    path : 'v2.6/me/messages?access_token=EAAcMjrnEeygBAJzM3livVqEz6qoNDkJFLRULe9T2Ycn5WAfL2XZBOPRzax9LI433Sm0D7ShGAgFZAcyJmx2By6WTwoid48mvycZCbvUQ3jNESD6Kj3v7EwslqVI3ZBpsn6n0RtDIKDCeXZCLg6LSh1ZAyaqZA5MyC1O6wdZCIKlARgZDZD',
    method : 'POST',
    headers : postheaders
};









app.get('/omnichannel/selection', function (req, res) {
    res.sendFile(path.join(__dirname+'/design.html'));
  });
app.get('/ominichannel/selection/:userId',function(req,res){

    console.log(`request URI:::${req.params.userId}`);
	
	
	 var reqPost = https.request(optionspost, function(res) {
        console.log("statusCode: ", res.statusCode);
         
        res.on('data', function(d) {
            console.log(`============POST result:============\n`);
            process.stdout.write(d);
            console.log(`\n\nPOST completed`);
        });
    });
     
    // write the json data
    reqPost.write(JSON.stringify(payload));
	reqPost.on('error', function(e) {
        console.error(e);
    });

});
app.post('/postpayload',function(req,res){
   
    console.log(`payload :::${JSON.stringify(req.body)}`);
});
app.get('/omnichannel/facebook/webhook',function(req,res){
    let challenge = req.query['hub.challenge'];
    console.log(`challenge::${challenge}`);
    res.send(challenge);
});

app.post('/omnichannel/facebook/webhook', (req, res) => {  
 
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
  
  
