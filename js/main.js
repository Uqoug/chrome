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

chrome.tabs.executeScript(null, {
  file: 'js/content.js',
  runAt: 'document_start'
});
var mode = 'once';
$('#go').on('click', function(){
  var text = $('#text').val().trim();
  var num = $('.range-slider__value').text();
  if (text !== '') {
  chrome.tabs.executeScript(null, {
      code: 'text ="' + text + '";'
      + 'num =' + num + ';'
      + 'start = true;'
    });
  }
  if (mode=='once') {
    if (text !== '') {
      chrome.tabs.executeScript(null, {
          code: "$('.cs-textarea').val(text);" + "send();"
      });
    }
  }else if (mode=='low') {
    chrome.tabs.executeScript(null, {
        code: "run(25000);"
    });
  }else if (mode=='fast') {
    chrome.tabs.executeScript(null, {
        code: "run(15000);"
    });
  }else if (mode=='rapid') {
    chrome.tabs.executeScript(null, {
        code: "run(2000);"
    });
  }
})
$("#stop").on("click", function(){
  chrome.tabs.executeScript(null, {
      code: 'start = false;'
  });
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

$(".low").on('click', function(){
  mode = "low";
})
$(".fast").on('click', function(){
  mode = "fast";
})
$(".rapid").on('click', function(){
  mode = "rapid";
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


