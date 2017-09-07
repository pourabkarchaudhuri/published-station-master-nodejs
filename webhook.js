var dateformat = require("dateformat")
var pnrStatus = require('./src/pnrstatus');
var trainsBetween = require('./src/trainsbetween');
var seatAvailability = require("./src/availabilty");
var price = require("./src/price");
var customResponsePNR = require("./response/pnr");
var customResponseTrainAvailable = require("./response/trainavailable");
var customResponseClass = require("./response/travel_class");
var sendMsg = require("./response/text_Resp");
var customResponseSeatAvailable = require("./response/seat_availability")
var seatPrice= require("./src/price.js")



module.exports=function webhook(request,response){

let travellers_data;

    if(request.body.result.action=="CHECKPNR" ||request.body.result.action=="MOREPNRINFO"){
        pnrHnadler(request,response);
    }
    else if(request.body.result.action=="TRAINBETWEEN"){
        trainsHandler(request,response);
    }
    else if(request.body.result.action=="CLASSQUICK"){


        classHandler(request,response);

    }
    else if(request.body.result.action=="SEAT"){
        seatHandler(request,response);
    }

}


  function pnrHnadler(request,response){


    let action=request.body.result.action
    if(action==="CHECKPNR"){
      var pnrNo=request.body.result.parameters.PnrNumber;
      //console.log("PNR NO:",pnrNo);
      if(pnrNo.length != 10){
        sendMsg(response,"The PNR number is of 10-digits. Please enter a valid PNR number.");
        }else{
          pnrStatus(pnrNo,function (reservation_upto_name,from_station_name,total_passengers,doj,train_name,train_number,chart_prepared,travellers,journey_class,journey_code,err) {
            if (reservation_upto_name != null && from_station_name != null && total_passengers != null && doj != null && train_name != null && train_number != null && chart_prepared != null && travellers !=null && journey_class !=null && journey_code !=null){
              travellers_data=travellers;
              customResponsePNR.PNRCard(reservation_upto_name,from_station_name,total_passengers,doj,train_name,train_number,chart_prepared,travellers,journey_class,journey_code,response,err);
            }else{
              customResponsePNR.PNRNoData(response);
            }
        })
      }
  }else{
    //console.log("Printing data",JSON.stringify(travellers_data)+" "+action);
    customResponsePNR.PNRCarousel(travellers_data,response);
  }
}

  function trainsHandler(request,response){

    let src=request.body.result.parameters.source;
    let dest=request.body.result.parameters.destination;
    let doj=request.body.result.parameters.date;
    let range=request.body.result.parameters.number;

    let now =new Date(dateformat(new Date(),"yyyy-mm-dd"));

    let day = dateformat(request.body.result.parameters.date,"ddd").toUpperCase();
    doj=new Date(doj);


    console.log("accumulated data:",src,dest,doj,day);
    console.log("date of journey: ",doj+" current date",now);


    if(doj<now) {
      customResponseTrainAvailable.pastDate(response);      
    }else{
      doj =dateformat(doj,"dd-mm-yyyy");
      trainsBetween(src,dest,doj,day,function(train_number,train_name,train_travel_time,train_schedule_arrival,train_schedule_departure,train_cls,err){
        if(err==null){
          console.log("No err, moving to TrainCarousel");
        customResponseTrainAvailable.TrainCarousel(train_number,train_name,train_travel_time,train_schedule_arrival,train_schedule_departure,train_cls,src,dest,doj,range,response);
        }else{
          console.log("Err, moving to TrainCarouselNoData");
          customResponseTrainAvailable.TrainCarouselNoData(src,dest,response);
        }
      })
    }
  }

    function classHandler(request,response){
      console.log("Executing Class Function");
      let trainNo=request.body.result.parameters.trainNumber;
      let src=request.body.result.parameters.source;
      let dst=request.body.result.parameters.destination;
      let date=request.body.result.parameters.date;
      let cls=request.body.result.parameters.cls;
      let quota=request.body.result.parameters.quota;

      date=dateformat(date,"dd-mm-yyyy");
      console.log("Train No. "+trainNo+" has the following classes : "+cls.join(","));

      customResponseClass.ClassQuick(cls,response);

  }

  function quotaHandler(request,response){
    console.log("Executing Quota Function");
    customResponseClass.Quota(response);
  }

  function seatHandler(request,response){

    // console.log(JSON.stringify(request.body.result.parameters));
    // console.log(JSON.stringify(request.body.result.contexts));
      let trainNo=request.body.result.parameters.trainNumber;
      let src=request.body.result.parameters.source;
      let dst=request.body.result.parameters.destination;
      let date=request.body.result.parameters.date;
      let cls=request.body.result.parameters.cls;
      let quota=request.body.result.parameters.quota;
      let age=request.body.result.parameters.age.amount;
      let reqcontext=request.body.result.parameters.reqcontext;
      
      date=dateformat(date,"dd-mm-yyyy");
      console.log("Reformated Date : "+date);
      //console.log("Train No. "+trainNo+" has the following classes : "+cls.join(","));
      
      seatPrice(trainNo,src,dst,date,cls,quota,age,function(err,multidata){
        if(err!=null){
          console.log("Error occuered");
        }else{
          // console.log("DATA",data);
          customResponseSeatAvailable.seatCarousel(multidata,reqcontext,response);
        }
      });
  }
