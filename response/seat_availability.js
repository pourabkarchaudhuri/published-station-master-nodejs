module.exports={
  'seatCarousel':function(multidata,reqcontext,response) {
    console.log("Inside : "+reqcontext,typeof reqcontext);
    var data=multidata[0].availability;
    var train_name=multidata[0].train_name;
    var class_name=multidata[0].cls;
    var class_code=multidata[0].code;
    var quota_name=multidata[0].quota;
    var price=multidata[1].price;
    // console.log("Printing class_code",class_code,multidata[0].code)

   // let displaycls=[];
    var dynamicQuickReplies=[];

    reqcontext.forEach(function(element) {
      if(element != class_code){
        // console.log(typeof element ,typeof class_code);
        // console.log(element,"is not equal to",class_code);
        let quick_title="Check "+element+" Seats";
        let quick_payload="class "+element; 
        dynamicQuickReplies.push({
          "content_type":"text",
          "title": quick_title,
          "payload": quick_payload
        });
      } 
    });

    console.log("Dynamic Quick Replies built");
    if(train_name =="UNAVAILABLE"){
      var flag=1;
    }

    var messageOne="Here are the available seats in the "+train_name+" for the next 5 days it runs.";
    //console.log("forming");
    let dynamicBody=[];

    for(var i=0;i<data.length;i++){
      let title="Seat Status for "+data[i].date;
      let status=data[i].status;
      let subtitle="Status: "+status+"\nClass: "+class_name+"\nQuota: "+quota_name+"\nFare: ₹"+price;
        dynamicBody.push({
          "title": title,
          "subtitle": subtitle,
        })
    }

  if(flag==1){
     dynamicQuickReplies.push({
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
                  })
    var messageOne="It seems the seats for this class is unavailable at the moment. Try for this train later or go ahead for another train."
      var facebookResponse={

          "speech": "",
          "displayText": "",
          "data": {
            "facebook": [{
              "text":messageOne
            },
              {
                  "text":"Is there anything else?",
                  "quick_replies":dynamicQuickReplies
              }]
            },
          "contextOut": [],
          "source": "DuckDuckGo"
          }
  }
  else{
    dynamicQuickReplies.push({
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
                  })

  var facebookResponse={

          "speech": "",
          "displayText": "",
          "data": {
            "facebook": [{
              "text":messageOne
            },{
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
                  "quick_replies":dynamicQuickReplies
              }]
            },
          "contextOut": [],
          "source": "DuckDuckGo"
          }
  }

    response.send(facebookResponse);
  //  console.log("sent");
  }
}
