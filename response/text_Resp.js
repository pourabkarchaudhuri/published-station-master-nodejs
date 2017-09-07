module.exports=function sendMsg(response,messege){
response.json({
        speech: messege,
        displayText: messege,
        source: 'webhook'
    });
}

