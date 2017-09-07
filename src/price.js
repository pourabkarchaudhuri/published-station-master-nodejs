module.exports=function seatPrice(trainNo,src,dst,date,cls,quota,age,callback){ 
  // function seatPrice(trainNo,src,dst,date,cls,quota,age,callback){

    var async = require('async');
     
    async.parallel([

      function (callback) {
        seatAvailability(trainNo,src,dst,date,cls,quota,callback)
      },

      function (callback) {
        priceInfo(trainNo,src,dst,date,cls,quota,age,callback)
      }
    ],
      function (err, results) {
        console.log(JSON.stringify(results));
        callback(err,results);
      });
    }

function priceInfo(trainNo,src,dst,date,cls,quota,age,callback){
    console.log("PARAMETRES",trainNo,src,dst,date,cls,quota,age)
    var request = require("request");
    var price_value;
    var options = {
    method: 'GET',
    url: `http://api.railwayapi.com/v2/fare/train/${trainNo}/source/${src}/dest/${dst}/age/${age}/quota/${quota}/date/${date}/apikey/663h5e2h1b/`,
    headers:{ 
      'postman-token': '7d0838a3-e639-1a10-190e-a179de320833',
      'cache-control': 'no-cache' 
    } 
  };

    request(options, function (error, response, body) {
    var cost
    var data=JSON.parse(body);
    console.log(data);
    if(data.fare.length==0 || data.response_code!=200){
      cost={
        "price":"UNAVAILABLE"
      }
    }else{  
      data.fare.forEach(function(element){
        if(element.code==cls){
          console.log("Fare for "+cls+" Rs."+element.fare);
          price_value=element.fare;   
          cost={
            "price":price_value
          }
        }  
      })
    }
    callback(error,cost);  
  });
}

function seatAvailability(trainNo,src,dst,date,cls,quota,callback){
    var request = require("request");
    var options = { 
      method: 'GET',
      url: `http://api.railwayapi.com/v2/check-seat/train/${trainNo}/source/${src}/dest/${dst}/date/${date}/class/${cls}/quota/${quota}/apikey/663h5e2h1b/`,
    headers: {
      'postman-token': '69ce0ff9-dee6-47d5-26bf-aef8793353f2',
      'cache-control': 'no-cache'

    }  
  };

    request(options, function (error, response, body){    
    //console.log(body);
    var data=JSON.parse(body);
    if(data.train_name ==null || data.train_number== null || data.response_code !=200){

        var seats={
        "availability":"UNAVAILABLE",
        "cls":"UNAVAILABLE",
        "quota":"UNAVAILABLE",
        "train_name":"UNAVAILABLE"
      }
      
    }else{

      var seats={
        "availability":data.availability,
        "cls":data.class.name,
        "code":data.class.code,
        "quota":data.quota.quota_name,
        "train_name":data.train_name
      }
    }
    callback(error,seats);
    });
  }
