chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
    if(message.cmd == 'setmaxlength'){
        console.log(message.maxlength);
        var maxlength = message.maxlength;
    }else if(message.cmd == 'getmaxlength'){
      sendResponse("123");
    }
});