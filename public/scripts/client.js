/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$("document").ready(function () {
  //refresh every 60 seconds
  setInterval(() => {
    location.reload(true);
  }, 60000);

  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize().toString().split("=").slice(1);

    console.log();
    if (data[0] === null || data[0] === "") {
      return $(".new-tweet").append(
        alert("The tweet field cannot be left empty")
      );
    }

    if (data[0].length > 140) {
      return $("#tweet-form").append(
        alert("Your tweet must only be a maximum of 140 characters")
      );
    }

    $.post(
      "http://localhost:8080/tweets",
      $(this).serialize(),
      function (data) {
        console.log(data);
      }
    );

    location.reload(true);
  });

  const loadTweets = function () {
    $.get("http://localhost:8080/tweets", function (data) {
      renderTweets(data);
    });
  };

  const renderTweets = function (tweets) {
    // loops through tweet

    const sortedDesc = tweets.sort(
      (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
    );

    const allTweetsContainer = $(".all-tweets-container");

    for (let singleTweet of sortedDesc) {
      let tweet = createTweetElement(singleTweet);

      allTweetsContainer.append(tweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
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

    // ...
    return $tweet;
  };
  loadTweets();
});
