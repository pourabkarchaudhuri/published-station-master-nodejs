var express = require('express')
var request= require('request')
var bodyParser = require('body-parser')
var webhook =require('./webhook')

var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.post('/webhook',function(request,response){
  console.log("WEBHOOK TRIGRED")
  var messege=request.body.result.resolvedQuery;
  console.log("ACTION :",request.body.result.action);
  console.log("INCOMPLETE :",request.body.result.actionIncomplete);
  console.log("INTENT NAME",request.body.result.metadata.intentName);
  console.log("PARAMETERS : ",JSON.stringify(request.body.result.parameters));

  webhook(request,response);
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
