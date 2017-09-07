module.exports=function seatAvailability(trainNo,src,dst,date,cls,quota,callback){

// function seatAvailability(trainNo,src,dst,date,cls,kota){
    var request = require("request");

    console.log("inside seatAvailability rest call",trainNo,src,dst,date,cls,quota);
    var options = {
    method: 'GET',
    url: `http://api.railwayapi.com/v2/check-seat/train/${trainNo}/source/${src}/dest/${dst}/date/${date}/class/${cls}/quota/${quota}/apikey/663h5e2h1b/`,
    headers: {
    'postman-token': '69ce0ff9-dee6-47d5-26bf-aef8793353f2',
    'cache-control': 'no-cache' }
    };

    request(options, function (error, response, body){
    if (error) throw new Error(error);

    // console.log(body);
    data=JSON.parse(body);
    //console.log("VALUABLE INFO: ",data.availability);
    callback(data.availability,data.class.name,data.quota.quota_name,data.train_name);
    });

}
