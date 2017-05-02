chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        var maxlength = $(".cs-textarea").attr("maxlength") - 2;
        var ready = '';
        if (request.action == "Setmaxlength") {
            sendResponse(maxlength);
        }else if (request.action == "sendState") {
            ready = $(".b-btn").text();
            sendResponse(ready);
        }
    }
);