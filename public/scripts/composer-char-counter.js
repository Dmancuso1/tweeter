$(document).ready(function() {

  console.log('composer-char-counter ready')

  
  $("#tweet-text").on('keyup', function() {
    const target = $(this).closest(".new-tweet").find('.counter');
    target.html(140-this.value.length);
    if (this.value.length > 140) {
      target.addClass('overCharLimit')
    } else {
      target.removeClass('overCharLimit')
    }
  });



});