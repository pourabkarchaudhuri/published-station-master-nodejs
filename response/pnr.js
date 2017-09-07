module.exports={
  'PNRCard':function(reservation_upto_name,from_station_name,total_passengers,doj,train_name,train_number,chart_prepared,travellers,journey_class,journey_code,response,err) {
      //console.log(request.body);
      if(chart_prepared==true){
        chart_prepared="has been prepared.";
      }
      else if(chart_prepared==false){
        chart_prepared="is still not prepared.";
      }
      var messageTwo="The chart for this train "+chart_prepared+" View more specific details below.";
      var messageOne="I see that you're travelling from "+from_station_name+" to "+reservation_upto_name+" on "+doj+".";
      var journeySubtitle="From : "+from_station_name+"\nTo : "+reservation_upto_name+"\nDate : "+doj;
      var trainDetailsSubtitle="Train Name : "+train_name+"\nTrain Number : "+train_number+"\nCoach Class : "+journey_class;
      var facebookResponse={
                              "speech": "",
                              "displayText": "",
                              "data": {
                                "facebook": [
                                {
                                  "text":messageTwo
                                },
                                {
                                  "attachment": {
                                    "type": "template",
                                    "payload": {
                                      "template_type": "generic",
                                      "elements": [
                                        {
                                          "title": "Journey Details",
                                          "subtitle": journeySubtitle

                                        },
                                      ]
                                     }
                                    }
                                  },
                                {
                                  "attachment": {
                                    "type": "template",
                                    "payload": {
                                      "template_type": "generic",
                                      "elements": [
                                        {
                                          "title": "Train Details",
                                          "subtitle": trainDetailsSubtitle,
                                          "buttons": [
                                            {
                                              "type": "postback",
                                              "title": "More Info",
                                              "payload": "more_pnr_info"
                                            }
                                          ]
                                        },
                                      ]
                                     }
                                    }
                                  },
                                  {
                                      "text":"Is there anything else?",
                                      "quick_replies":[
                                      {
                                        "content_type":"text",
                                        "title":"More Detailed Info",
                                        "payload":"more_pnr_info"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Try Another PNR",
                                        "payload":"pnr_status"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Find Trains",
                                        "payload":"find_train"
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
                                  }
                                ]
                              },
                              "contextOut": [],
                              "source": "DuckDuckGo"
                            }

    response.send(facebookResponse);
  },
  'PNRCarousel':function(travellers_data,response) {
      //console.log(request.body);
      var dynamicBody=[];

      for(var i=0;i<travellers_data.length;i++){
        let bookingstatus=travellers_data[i].booking_status;
        let bookingarray=bookingstatus.split('/');
        let currentstatus=travellers_data[i].current_status;
        var title;
        let trainDetailsSubtitle ;
        //console.log("Printing raw data",bookingstatus);
        //console.log("Printing splited data",bookingarray[0],bookingarray[1],bookingarray[2])

        if (bookingarray[1]=="-"){
        trainDetailsSubtitle="Status : "+bookingarray[0]+"\nSeat/Berth No : "+bookingarray[2]+"\nCurrent Status : "+currentstatus;
        }else{
        trainDetailsSubtitle="Status : "+bookingarray[0]+"\nCoach : "+bookingarray[1]+"\nSeat/Berth No : "+bookingarray[2]+"\nCurrent Status : "+currentstatus;
        }

        if(travellers_data.length==1){
          title="Passenger Booking Status";
        }
        else{
          title="Passenger "+(i+1)+" Booking Status";
        }
        dynamicBody.push({
          "title": title,
          "subtitle": trainDetailsSubtitle,
        })
      }


      var facebookResponse={
                              "speech": "",
                              "displayText": "",
                              "data": {
                                "facebook": [{
                                                "attachment": {
                                                  "type": "template",
                                                  "payload": {
                                                    "template_type": "generic",
                                                    "elements": dynamicBody
                                                   }
                                                  }
                                                },
                                                {
                                                    "text":"Is there anything else?",
                                                    "quick_replies":[
                                                    {
                                                      "content_type":"text",
                                                      "title":"Try Another PNR",
                                                      "payload":"pnr_status"
                                                    },
                                                    {
                                                      "content_type":"text",
                                                      "title":"Find Trains",
                                                      "payload":"find_train"
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

    response.send(facebookResponse);
  },
  'PNRNoData':function(response) {
      //console.log(request.body);

      //var messageTwo="The chart for this "+chart_prepared+" View more specific details below.";
      var messageOne="The PNR number you gave has expired or it's not a valid one. If this issue persists, try after some time :) ";
      //var trainDetailsSubtitle="Train Name:"+train_name+"\nTrain Number:"+train_number+"\nCoach Class:"+journey_class;
      var facebookResponse={
                              "speech": "",
                              "displayText": "",
                              "data": {
                                "facebook": [
                                  {
                                      "text":messageOne,
                                      "quick_replies":[
                                      {
                                        "content_type":"text",
                                        "title":"Try Again",
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
                                  }
                                ]
                              },
                              "contextOut": [],
                              "source": "DuckDuckGo"
                            }

    response.send(facebookResponse);
  },
}
