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

$('#go').on('click', function(){
  function insertText(){
    var text = $('#text').val();
    chrome.tabs.executeScript(null, {
        code: '$(".cs-textarea").val(' + text + ')',
        runAt: 'document_start'
    });
  }
  function send(){
    chrome.tabs.executeScript(null, {
        code: '$(".b-btn").click()',
        runAt: 'document_start'
    });
  }
  insertText();

          //向tab发送请求
    chrome.extension.sendMessage({cmd:'getmaxlength'}, function(response){
      console.log(response);
    });
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


