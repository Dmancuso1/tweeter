$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    const target = $(this).closest(".new-tweet").find('.counter');
    target.text(140 - this.value.length);
    if (this.value.length > 140) {
      target.addClass('overCharLimit');
    } else {
      target.removeClass('overCharLimit');
    }
  });
});