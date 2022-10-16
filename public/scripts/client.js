/* eslint-disable no-undef */

$("document").ready(function() {
  $("#tweet-text").focus();
  //header toggle button
  $("#write-tweet").click(function() {
    $(".new-tweet").toggle(300);
    return $("#tweet-text").focus();
  });

  //scroll back up button appears once scroll is near bottom
  $(document).scroll(function() {
    let y = $(this).scrollTop();
    if (y > 400) {
      $(".bottomMenu").fadeIn();
    } else {
      $(".bottomMenu").fadeOut();
    }
  });

  //form submission handler
  $("#tweet-form").submit(function(event) {
    event.preventDefault();

    //tweet audio #stretch
    const audioSuccess = new Audio("sounds/twitter-success.mp3");
    const audioFailure = new Audio("sounds/twitter-error.mp3");
    audioSuccess.volume = 0.1;
    audioFailure.volume = 0.1;

    let data = $(this).serialize().toString().split("=").slice(1);

    if (data[0] === null || data[0] === "") {
      audioFailure.play();
      $(".errorLength").hide(200);
      return $(".errorEmptyField").show(1200);
    }

    if (data[0].length > 140) {
      audioFailure.play();
      //hide other error
      $(".errorEmptyField").hide(200);
      //display new error
      return $(".errorLength").show(1200);
    }

    $.post("http://localhost:8080/tweets", $(this).serialize());

    //play tweet audio if post sucessful
    audioSuccess.play();

    setTimeout(() => {
      location.reload(true);
    }, 400);
  });

  const loadTweets = function() {
    $.get("http://localhost:8080/tweets", function(data) {
      renderTweets(data);
    });
  };

  const renderTweets = function(tweets) {
    const allTweetsContainer = $(".all-tweets-container");

    for (let singleTweet of tweets) {
      let tweet = createTweetElement(singleTweet);

      allTweetsContainer.prepend(tweet);
    }
  };

  //prevent attacks by checking for special characters
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let $tweet = $(`<div class="single-tweets-container">
    <div class="tweets-container-content">
      <div class="content-top">
        <div class="content-top-right">
        <img src="${tweet.user.avatars}"/>
          <p>${tweet.user.name}</p>
        </div>
        <div class="content-top-left">
          <p>${tweet.user.handle}</p>
        </div>
      </div>
      <div class="content-middle">
      ${escape(tweet.content.text)}
      </div>
      <div class="content-bottom">
      <div class="bottom-content-date">
      ${timeago.format(tweet.created_at)}
      </div>
        <div class="content-bottom-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
    </div>
  </div>`);

    return $tweet;
  };
  loadTweets();
});
