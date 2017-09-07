module.exports=function pnrStatus(pnr,callback){

    var request=require("request");

    var options = {
        method: 'GET',
        url: `http://api.railwayapi.com/v2/pnr-status/pnr/${pnr}/apikey/663h5e2h1b/`
        };
    request(options, function (error, response, body) {
        if (error){
            callback(null,null,null,null,null,null,null,null,null,"issue with api");
        }else{

            let err;
            var data =JSON.parse(body);
            var travellers=[];
            data.passengers.forEach(function(element) {
                travellers.push(element)
            })
            //console.log(data.reservation_upto.name,data.from_station.name,data.total_passengers,data.doj,data.train.name,data.train.number,data.chart_prepared,null)
            if(data.reservation_upto.name !=null || data.from_station.name !=null ||data.total_passengers !=null || data.doj !=null || data.train.name!=null || data.journey_class.name!=null || data.journey_class.code!=null || data.train.number !=null || data.response_code == 200){

                callback(data.reservation_upto.name,data.from_station.name,data.total_passengers,data.doj,data.train.name,data.train.number,data.chart_prepared,travellers,data.journey_class.name,data.journey_class.code,null);
            }else{

                callback(null,null,null,null,null,null,null,null,null,"data not found");
            }
        }
    });

}
