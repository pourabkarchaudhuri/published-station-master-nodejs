module.exports = {
  'ClassQuick' : function(train_cls,response){
    console.log("Building Train Seat Quick Replies");
    var dynamicBody=[];

    var messageOne = "Please choose the seating class.";


    //checking data
    // console.log(train_number);
    // console.log(train_name);
    // console.log(train_travel_time);
    // console.log(train_schedule_arrival);
    // console.log(train_schedule_departure);
     for(var i=0;i<train_cls.length;i++){

      var className = train_cls[i];
      var classPayload = "class "+train_cls[i].slice(0,1)+" "+train_cls[i].slice(1);
      //console.log("Outgoing Quick Reply Payload : "+classPayload);
       dynamicBody.push({
         "content_type":"text",
         "title":className,
         "payload":classPayload
       })
     }
     var facebookResponse={
                              "speech": "",
                              "displayText": "",
                              "data": {
                                "facebook": [
                                  {
                                      "text":messageOne,
                                      "quick_replies":dynamicBody
                                  }
                                ]
                              },
                              "contextOut": [],
                              "source": "DuckDuckGo"
                            }

    response.send(facebookResponse);

    //end of 'ClassQuick' function
  }
}
