module.exports=function trainsBetween(src,dst,doj,day,callback){

    var request=require("request");
    var dateformat = require('dateformat');

    let now = new Date();

    var UTC = now.getTime() // Get UTC Timestamp

    now.setHours(now.getHours() + 5); // set Hours to 5 hours later
    now.setMinutes(now.getMinutes() + 30); // set Minutes to be 30 minutes later
    let currentTime = dateformat(now, "HH:MM");
    let currentDate= dateformat(now,"dd-mm-yyyy")

console.log("IST Time : "+currentTime);
console.log("Travel day :",day);

    var options = {
        method: 'GET',
        url: `http://api.railwayapi.com/v2/between/source/${src}/dest/${dst}/date/${doj}/apikey/663h5e2h1b/`
    };
//
    request(options, function (error, response, body) {


        if (error) throw new Error(error);
         //console.log(body);
        let train_number =[];
        let train_name = [];
        let train_travel_time=[];
        let train_schedule_departure=[];
        let train_schedule_arrival=[];
        let train_cls=[];

        let inner=[];
        let dynamicCode=[]

       // Push that array into Each Train in loop

        // Push all classes of single train STEP 1

        let msg;
        data=JSON.parse(body);
        if(doj===currentDate){
            console.log("Today");
            data.trains.forEach(function(element) {
            element.days.forEach(function(element1){
                if(element.src_departure_time>currentTime && element1.code === day && element1.runs==="Y"){
                    //trains.push(element.number+" "+element.name+"\n  Travel Time "+element.travel_time+" hrs");
                    console.log("Today's Matches");
                    train_number.push(element.number);
                    train_name.push(element.name);
                    train_travel_time.push(element.travel_time);
                    train_schedule_departure.push(element.src_departure_time);
                    train_schedule_arrival.push(element.dest_arrival_time);

                    for(var j=0;j<element.classes.length;j++){
                            if(element.classes[j].available==="Y"){
                                dynamicCode.push(element.classes[j].code);
                            }
                          }
                          //console.log(dynamicCode);
                          train_cls.push({"code_data":dynamicCode});
                          dynamicCode=[];
                }
            })
          });
        }//End of IF
        else{
            console.log("Tomorrow Onwards");
            data.trains.forEach(function(element) {
                element.days.forEach(function(element1){
                    if(element1.code === day && element1.runs==="Y"){
                        //console.log("Tomorrow Onwards matches");
                        //trains.push(element.number+" "+element.name+"\n  Travel Time "+element.travel_time+" hrs");
                        train_number.push(element.number);
                        train_name.push(element.name);
                        train_travel_time.push(element.travel_time);
                        train_schedule_departure.push(element.src_departure_time);
                        train_schedule_arrival.push(element.dest_arrival_time);

                        for(var j=0;j<element.classes.length;j++){
                            if(element.classes[j].available==="Y"){
                                dynamicCode.push(element.classes[j].code);
                            }
                          }
                          //console.log(dynamicCode);
                          train_cls.push({"code_data":dynamicCode});
                          dynamicCode=[];

                    }
                })
            });
        }
        //console.log(JSON.stringify(train_cls));
        if(train_number.length != 0){
            //msg=trains.join("\n");
            console.log("Trains Exist");
            //console.log(JSON.stringify(train_cls));
            callback(train_number,train_name,train_travel_time,train_schedule_arrival,train_schedule_departure,train_cls,null);
        }else{
            console.log("No Train Results");
            callback(null,null,null,null,null,null,"No trains found");
        }


    });

}
