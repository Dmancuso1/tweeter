/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// use this to escape XSS injections.
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// takes in array of tweet objects
// leverage createTweetElement(tweet)
//appends each to #tweets-container
const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    createTweetElement(tweet);
    $('#tweets-container').append(createTweetElement(tweet));
  });
};

// Returns a tweet(article)
const createTweetElement = (tweetObj) => {
  const date = Date(tweetObj.created_at).toString();
  let $tweet = `
  <article class="tweet">
  <header>
    <div class="user-logo">
      <img src=${tweetObj.user.avatars} height="40px"; width="40px"; alt="">
      <span>${tweetObj.user.name}</span>
    </div>
    <span class="handle">${tweetObj.user.handle}</span>
  </header>
  <section>
    <p>${escape(tweetObj.content.text)}</p>
  </section>
  <footer>
    <span id="date">${date}</span>
    <div>
      <img src="./images/heart-red.svg" id="heart" height="30px"; width="30px" alt="<3">
    </div>
  </footer>  
</article>
  `;
  return $tweet;
};



$(document).ready(function() {

  // submit tweet form with ajax. form is serialized
  $('#tweet-form').submit(function(e) {
    e.preventDefault();
    const target = $(this).closest(".new-tweet").find('.counter');
    const userInput = $(this).find('textarea').val();
    if (userInput === "" || !userInput.trim()) {
      $('#ValidateError').hide();
      $('#ValidateError').text("Oops! You didn't enter anything!");
      $("#ValidateError").slideDown(200);
      return null;
    }
    if (userInput.length > 140) {
      $('#ValidateError').hide();
      $('#ValidateError').text("Oops! You're over the character limit!");
      $("#ValidateError").slideDown(200);
      return null;
    }
    const serialized = $(this).serialize();
    $.ajax('/tweets/', {method: 'POST', data: serialized})
      .then(function(result) {
        $('#tweets-container').empty();
        target.text(140);
        loadTweets();
        $('#ValidateError').css('display', 'none');
        $('#tweet-form').trigger("reset");
      });
  });

  //load tweets from db
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/',
      method: 'GET'
    }).then((response) => {
      renderTweets(response.reverse());
    });
  };
  loadTweets();

});