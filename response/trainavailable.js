module.exports = {
  'TrainCarousel' : function(train_number,train_name,train_travel_time,train_schedule_arrival,train_schedule_departure,train_cls,src,dest,doj,range,response){
    console.log("Building Train Carousel");
//
    console.log("Incoming Range : "+range);
    if(range[0]==null){
      console.log("Nothing Inside");
      range[0]=0;
      range[1]=10;
    }
    else {
      console.log("Something Inside : "+range);

    }
    console.log("Range parameters Now : "+range);
//
    var dynamicBody=[];
    if(train_number.length==1){
      var messageOne = "There is only "+train_number.length+" train available.";
    }
    else{
      var messageOne = "There are "+train_number.length+" trains available. I'll show you few at a time. Click More Trains to see the rest of them."; 
    }

    var messageTwo = "Is there anything else?";
    //checking data
    // console.log(train_number);
    // console.log(train_number.length);
    //console.log(train_cls);
    // console.log(train_cls.length);
    // console.log(train_name);
    // console.log(train_travel_time);
    // console.log(train_schedule_arrival);
    // console.log(train_schedule_departure);


    // train_cls.forEach(function(element) {
    //  element.forEach(function(cls){
    //    cls=cls.slice(0,1)+" "+cls.slice(1);
    //  })
    // });

    //  for(var i=0;i<train_cls.length;i++){
    //    for(j=0;j<train_cls[i].code_data.length;j++){
    //         train_cls[i].code_data[j]=train_cls[i].code_data[j].slice(0,1)+" "+train_cls[i].code_data[j].slice(1);
    //    }
    //  }
    var trainlength=train_number.length;

     if(trainlength<=10){
         console.log("Normal less than or equals 10 flag set as 1");
         var flag=1;
         range[1]=trainlength;
    }
    else if(trainlength>10){
      console.log("Greater than 10")
      if(trainlength==range[1]){
        var flag=3;
        console.log("Final Flag");
        trainlength=range[1];
      }
      else{
        //trainlength=range[1]-range[0];
        console.log("Loop counter now : "+range[1]);
        var flag=2;
      }
    }


    // if(range[1]==trainlength){
    //   console.log("range[1]==trainlength");
    //   range[0]=0;
    //   range[1]=10;
    //   var flag=2;
    // }
    //  //console.log(train_cls);
console.log("Range parameters Going In : "+range);
//till train_number.length
console.log("Loop Init : "+range[0]);
console.log("Loop End : "+trainlength);
    for(var i=range[0];i<range[1];i++){

        for(j=0;j<train_cls[i].code_data.length;j++){
             train_cls[i].code_data[j]=train_cls[i].code_data[j].slice(0,1)+" "+train_cls[i].code_data[j].slice(1);
        }

      var stringifiedClass = train_cls[i].code_data.join(",");
      //console.log(stringifiedClass);
      var title = train_name[i];
      var train_payload = train_number[i]+" seat "+stringifiedClass;
      //console.log("Quick Reply Payload Set as : "+train_payload);
      var trainDetailsSubtitle = "Train no: "+train_number[i]+" Travel Time: "+train_travel_time[i]+" Hrs\nDeparture: "+train_schedule_departure[i]+" Hrs\nArrival: "+train_schedule_arrival[i]+" Hrs";
      // console.log("Printing Indexed element "+i);
      // console.log("Train Number :"+train_number[i]);
      dynamicBody.push({
        "title": title,
        "subtitle": trainDetailsSubtitle,
        "buttons":[
          {
            "type":"postback",
            "payload":train_payload,
            "title":"Available Seats"
          }
        ]
      })
      //console.log("Train "+(i+1)+" pushed to JSON");
    }//end of loop

    // console.log("The Dynamic Body for JSON has been Built");
   if(flag==1){
    // console.log("Showing Train Response for Normal Range less than 10");
    var facebookResponse={
                            "speech": "",
                            "displayText": "",
                            "data": {
                              "facebook": [{
                                "text":messageOne
                              },
                              {
                                  "attachment": {
                                    "type": "template",
                                    "payload": {
                                      "template_type": "generic",
                                      "elements": dynamicBody
                                     }
                                    }
                                  },
                                  {
                                      "text":messageTwo,
                                      "quick_replies":[
                                      {
                                        "content_type":"text",
                                        "title":"Find Another Train",
                                        "payload":"find_train"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Check PNR Status",
                                        "payload":"pnr_status"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Another Question",
                                        "payload":"another_query"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"That's all",
                                        "payload":"thanks"
                                      }
                                    ]
                                  }]
                            },
                            "contextOut": [],
                            "source": "DuckDuckGo"
                          }
                        }//end of custom JSON

        else if(flag==2){
          // console.log("Will Build Train Response for "+range[0]+" to "+range[1]);
          //var temp=range[0];
          range[0]=range[1];//20
            // console.log("Range[0]="+range[0]);
          var remainder=train_number.length%10;//Remainder 7
            // console.log("Remainder="+remainder);

          if(range[0]==(train_number.length-remainder)){
            console.log("Range[0]==(trainlength-remainder)");
            //range[0]=temp;
            range[1]=range[0]+remainder;
            // console.log("Setting Range[1]="+range[1]);

          }
          else if(range[0]<=(train_number.length-remainder)){
            // console.log("Range[0]<=(trainlength-remainder)");
            range[1]=range[0]+10;
              // console.log("Setting Range[1]="+range[1]);
          }

        //range[1]=trainlength-(trainlength%range[1]);
        // range[0]=range[0]+10;
        // range[1]=range[1]+10;
       var dynamicTrainPayload = "from "+src+" to "+dest+" on "+doj+" start "+range[0]+" stop "+range[1];
      //  console.log(dynamicTrainPayload);
       var facebookResponse={
                               "speech": "",
                               "displayText": "",
                               "data": {
                                 "facebook": [{
                                   "text":messageOne
                                 },
                                 {
                                     "attachment": {
                                       "type": "template",
                                       "payload": {
                                         "template_type": "generic",
                                         "elements": dynamicBody
                                        }
                                       }
                                     },
                                     {
                                         "text":messageTwo,
                                         "quick_replies":[
                                           {
                                             "content_type":"text",
                                             "title":"More Trains",
                                             "payload":dynamicTrainPayload
                                           },
                                         {
                                           "content_type":"text",
                                           "title":"Find Another Train",
                                           "payload":"find_train"
                                         },
                                         {
                                           "content_type":"text",
                                           "title":"Check PNR Status",
                                           "payload":"pnr_status"
                                         },
                                         {
                                           "content_type":"text",
                                           "title":"Another Question",
                                           "payload":"another_query"
                                         },
                                         {
                                           "content_type":"text",
                                           "title":"That's all",
                                           "payload":"thanks"
                                         }
                                       ]
                                     }]
                               },
                               "contextOut": [],
                               "source": "DuckDuckGo"
                             }
                            //  console.log("Facebook : : "+JSON.stringify(facebookResponse));
                           }//end of custom JSON
       else if(flag==3){
        console.log("Showing Train Response for Normal Range less than 10");
        var facebookResponse={
                                "speech": "",
                                "displayText": "",
                                "data": {
                                  "facebook": [{
                                    "text":messageOne
                                  },
                                  {
                                      "attachment": {
                                        "type": "template",
                                        "payload": {
                                          "template_type": "generic",
                                          "elements": dynamicBody
                                         }
                                        }
                                      },
                                      {
                                          "text":messageTwo,
                                          "quick_replies":[
                                          {
                                            "content_type":"text",
                                            "title":"Find Another Train",
                                            "payload":"find_train"
                                          },
                                          {
                                            "content_type":"text",
                                            "title":"Check PNR Status",
                                            "payload":"pnr_status"
                                          },
                                          {
                                            "content_type":"text",
                                            "title":"Another Question",
                                            "payload":"another_query"
                                          },
                                          {
                                            "content_type":"text",
                                            "title":"That's all",
                                            "payload":"thanks"
                                          }
                                        ]
                                      }]
                                },
                                "contextOut": [],
                                "source": "DuckDuckGo"
                              }
                            }


    response.send(facebookResponse);

    //end of 'TrainCarousel' function
  },


  'TrainCarouselNoData' : function(src,dst,response){
    console.log("Building Train Carousel No Data");
    var messageOne="I'm sorry but there are no trains travelling from "+src+" to "+dst+" on this day.";
    var messageTwo="Or, you may have given me the source or destination with a wrong spelling.";
    var messageThree="*Please note I don't show results of any Special Trains."
    var facebookResponse = {
                            "speech": "",
                            "displayText": "",
                            "data": {
                              "facebook": [{
                                "text":messageOne
                              },{
                                "text":messageTwo
                              },{
                                "text":messageThree
                              },{
                                      "text":"Is there anything else?",
                                      "quick_replies":[
                                      {
                                        "content_type":"text",
                                        "title":"Try Again",
                                        "payload":"find_train"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Check PNR Status",
                                        "payload":"pnr_status"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Another Question",
                                        "payload":"another_query"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"That's all",
                                        "payload":"thanks"
                                      }
                                    ]
                                  }]
                            },
                            "contextOut": [],
                            "source": "DuckDuckGo"
                          };

    response.send(facebookResponse);
  },
  'pastDate':function(response){
    console.log("Building Train Carousel No Data");
    var messageOne="Trains travel to your destination, not to the past. :P";
    var messageTwo="Seems like you have givem me a past date";
    var facebookResponse = {
                            "speech": "",
                            "displayText": "",
                            "data": {
                              "facebook": [{
                                "text":messageOne
                              },{
                                "text":messageTwo
                              },
                              {
                                      "text":"Is there anything else?",
                                      "quick_replies":[
                                      {
                                        "content_type":"text",
                                        "title":"Try Again",
                                        "payload":"find_train"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Check PNR Status",
                                        "payload":"pnr_status"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Another Question",
                                        "payload":"another_query"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"That's all",
                                        "payload":"thanks"
                                      }
                                    ]
                                  }]
                            },
                            "contextOut": [],
                            "source": "DuckDuckGo"
                          };

    response.send(facebookResponse);
  }
}
