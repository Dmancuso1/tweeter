/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





// takes in array of tweet objects
// leverage createTweetElement func by passing the tweet object to it.
//appends each to #tweets-container. 
const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    createTweetElement(tweet)
    $('#tweets-container').append(createTweetElement(tweet))
  })
}

// Returns a tweet(article) containing all the HTML structure of the tweet. 
const createTweetElement = (tweetObj) => {
  const date = new Date(1382086394000)
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
    <p>"${tweetObj.content.text}"</p>
  </section>
  <footer>
    <span>${date}</span>
    <div>
      <span><3</span>
    </div>
  </footer>  
</article>
  `;
  return $tweet;
}




$(document).ready(function () {


  $('#tweet-form').submit(function(e) {
    e.preventDefault()
    const userInput = $('#tweet-text').val(); 
    if (!userInput) {
      alert('user field is empty');
      return;
    }
    if (userInput.length > 140) {
      alert('over 140 chars');
      return;
    }
    const textContent = $('#tweet-text');
    const serialized = $(textContent).serialize() 
    $.ajax('/tweets/', {method: 'POST', data: serialized})
    .then(function (result) {
      $('#tweets-container').empty()
      loadTweets();
      $('#tweet-form').trigger("reset")
    }); 
  })

  //load tweets from db
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/', 
      method: 'GET'
    }).then((response) => {
      renderTweets(response.reverse())
    });
  }
  loadTweets();


})