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
  var again = setInterval(function () {
    ready = $(".b-btn").text();
    if (ready == "发送") {
      if (start && num>0) {
        insertText();
        setTimeout(send, 520);
        num = num - 1;
      }else if (num<=0 && !start) {
        clearInterval(again);
      }
    }
  }, speed);
}

function Gift_trun() {
  var shie = $("#js-shie-gift");
  var ad = $("#js-chat-right-ad,.tab-body:eq(1),.room-ad-bottom,.room-ad-video-down,.js-chat-right-ad,.room-ad-top,.chat-ad,#starwall-520-show,#js-chat-notice,#js-live-room-recommend,.act520-lights,.action-list,.sq-ad");
  $(document).ready(function(){
    setTimeout(function(){
        //除广告
        ad.remove();
    },1000);
    setTimeout(function(){
        ad.remove();
    },4000);
    setTimeout(function(){
        if (shie.attr("class") == "shie"){
            $("#shie-switch").click();
        }
        ad.remove();
    },8000);
  });
}
$(document).ready(Gift_trun());


