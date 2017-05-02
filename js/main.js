$('#buttons a').on('click', function(){
  $('a.selected').removeClass('selected');
  $('#buttons a').removeAttr('class');
  $(this).addClass('selected');

  $('#wheel').removeAttr('class');
  var speed = $(this).attr('data-speed');
  var color = $(this).attr('data-bg');
  setTimeout(function(){
    $('#wheel').addClass(function(){
      return speed;
    });
  }, 5)
})

var start = true;
$('#go').on('click', function(){
  start = true;
  var num = $('.range-slider__value').text();
  function insertText(){
    var text = $('#text').val().trim();
    if (text !== '') {
      text = "'" + text 
           + Math.floor(Math.random()*100) + "'";
      chrome.tabs.executeScript(null, {
          code: '$(".cs-textarea").val(' + text + ')',
          runAt: 'document_start'
      });
    }
  }
  function send(){
    if (text !== ''){
      chrome.tabs.executeScript(null, {
          code: '$(".b-btn").click()',
          runAt: 'document_start'
      });
    }
  }
  function run(speed) {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendRequest(tab.id, { action: "sendState" }, function (response) {
        if (response == "发送") {
          insertText();
          send();
          num = num - 1;
          $('.range-slider__value').text(num);
          if (num>0 && start) {
            setTimeout(run, speed);
          }
        }else if (response !== "发送") {
          if (num>0 && start) {
            setTimeout(run, speed);
          }
        }
      });
    });
  }
  if (mode=='once') {
    var oncetext = $('#text').val().trim();
    if (oncetext !== '') {
      oncetext = "'" + oncetext + "'";
      chrome.tabs.executeScript(null, {
          code: '$(".cs-textarea").val(' + oncetext + ')',
          runAt: 'document_start'
      });
    }
    send();
  }else if (mode=='low') {
    run(25000);
  }else if (mode=='fast') {
    run(15000);
  }else if (mode=='rapid') {
    run(1000);
  }
})
$("#stop").on("click", function(){
  start = false;
})
$('#text').on('keydown',function(e){
    if(e.keyCode!=13) return;
    e.preventDefault();
});

$(window).keydown(function(event){
  if (event.keyCode == '13') {
    $("#go").click();
  }
})

var mode = 'once';
$(".low").on('click', function(){
  mode = 'low';
})
$(".fast").on('click', function(){
  mode = 'fast';
})
$(".rapid").on('click', function(){
  mode = 'rapid';
})


var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function(){
      $(this).next(value).html(this.value);
    });
  });
};

rangeSlider();

chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendRequest(tab.id, { action: "Setmaxlength" }, function (response) {
      $("#text").attr("maxlength", response);
    });
});


$('#text').focus();


