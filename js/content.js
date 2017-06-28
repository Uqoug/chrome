var text = '';
var sendtext = '';
var num = 0;
var start = true;

function insertText(){
  if (text !== '') {
    sendtext = text + Math.floor(Math.random()*100);
    $('.cs-textarea').attr('maxlength', '35');
    $('.cs-textarea').val(sendtext);
  }
}
function send(){
  if (text !== ''){
    $(".b-btn").click();
  }
}
function run(speed) {
  var ready = '';
  var again1 = setInterval(function () {
    ready = $(".b-btn").text();
    if (ready == "发送") {
      if (start && num>0) {
        insertText();
        setTimeout(send, 520);
        num = num - 1;
      }else if (num<=0 && !start) {
        clearInterval(again1);
      }
    }
  }, speed);
}

function close_gift() {
  var shie = $("#shie-switch");
  var ad = $("#js-chat-right-ad,.tab-body:eq(1),.room-ad-bottom,.room-ad-video-down,.js-chat-right-ad,.room-ad-top,.chat-ad,#starwall-520-show,#js-chat-notice,#js-live-room-recommend,.act520-lights,.action-list,.sq-ad");
  function close() {
    shie.click();
    ad.remove();
    $(".shie-input[data-shield-type='allGift']").click();
  }
  if (($(".vip em").text() !== '') && (shie.attr("class") == "shie-input")) {
    setTimeout(close, 2000);
    clearInterval(again2);
  }
}
var again2 = setInterval(function () {
  close_gift();
}, 1000);