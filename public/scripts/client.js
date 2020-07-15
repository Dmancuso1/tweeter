/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//////// Remove after testing ! ///////////
const tweetData = [
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  }
];
//////// Remove after testing ! ///////////


// takes in array of tweet objects
// leverage createTweetElement func by passing the tweet object to it.
//appends each to #tweets-container. 
const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    console.log(tweet)
    createTweetElement(tweet)
    $('#tweets-container').append(createTweetElement(tweet))
  })
}

// Returns a tweet(article) containing all the HTML structure of the tweet. 
const createTweetElement = (tweetObj) => {
  console.log(tweetObj);
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


  // renderTweets(tweetData)


  $('#tweet-form').submit(function(e) {
    e.preventDefault()
    // console.log(e)
    const textContent = $('#tweet-text');
    // console.log('text content', textContent)
    const serialized = $(textContent).serialize() 
    // console.log('serialized ', serialized)
    $.ajax('/tweets/', {method: 'POST', data: serialized})
    .then(function (result) {
      // console.log('then func data', result);
    }); 
  })

  //load tweets from db
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/', 
      method: 'GET'
    }).then((response) => {
      renderTweets(response)
    });
  }
  loadTweets();


})