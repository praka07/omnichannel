var express = require('express');
var myParser = require("body-parser");
var https = require('https');
var path = require("path");
var app = express();
var Bot = require('messenger-bot');
var mLab = require('mongolab-data-api')('w_AGSTEBxndTQ_LTeiFWDS4FVpPM1khT');

app.use(myParser.json());

let bot = new Bot({
  token: 'EAAcMjrnEeygBAJzM3livVqEz6qoNDkJFLRULe9T2Ycn5WAfL2XZBOPRzax9LI433Sm0D7ShGAgFZAcyJmx2By6WTwoid48mvycZCbvUQ3jNESD6Kj3v7EwslqVI3ZBpsn6n0RtDIKDCeXZCLg6LSh1ZAyaqZA5MyC1O6wdZCIKlARgZDZD',
  // verify: 'VERIFY_TOKEN',
  app_secret: '164e65ba6bc5a042be106026aa55824f'
});

app.get('/omnichannel/selection', function (req, res) {
  res.sendFile(path.join(__dirname + '/design.html'));
});
app.post('/ominichannel/sendMessenger', function (req, res) {
  console.log(`request URI:::${req.body.airline_FFNumber}`);
  var options = {
    database: 'ominichannel',
    collectionName: 'userInfo',
    query: '{ "flyernumber": "' + req.body.airline_FFNumber + '" }'
  };
  var fbNumber;
  mLab.listDocuments(options, function (err, data) {
    console.log(data);
    data.forEach(function (doc, index) {
      fbNumber = doc.fbNumber;
      console.log('fbnumber from database ${fbNumber}');
    });
    console.log(`fbnumber :::${fbNumber} for flyer number ::: ${req.body.airline_FFNumber}`);
  });

  let temp = { "attachment": { "type": "template", "payload": { "template_type": "button", "text": "Hi, Buddy Great to see you here... Please proceed seat selection by clicking the folloeing button", "buttons": [{ "type": "web_url", "url": "https://www.messenger.com", "title": "Continue Journey" }] } } }
  bot.sendMessage(fbNumber, temp, function (err, info) {
    console.log(err)
    console.log(info)

  });
  res.sendStatus(200);
});

app.get('/omnichannel/facebook/webhook', function (req, res) {
  let challenge = req.query['hub.challenge'];
  console.log(`challenge::${challenge}`);
  res.send(challenge);
});

app.get('/omnichannel/alexa/check', function (req, res) {

  response = {
    "message":"Welocme to world"
 };
 console.log(response);
 
  res.send(JSON.stringify(response));
});

app.post('/omnichannel/facebook/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {

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

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
