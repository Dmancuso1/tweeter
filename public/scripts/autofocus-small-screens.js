// autofocus on small screens. 
// TODO: fix so not have to refresh page to run this function..
$(document).ready(function() {
  const textBox = $("#tweet-text");
  if ($( window ).width() < 620) {
    textBox.focus()
  }
});

