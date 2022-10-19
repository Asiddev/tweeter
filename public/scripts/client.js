/* eslint-disable no-undef */

$("document").ready(function () {
  //header toggle button
  $("#write-tweet").click(function () {
    $(".new-tweet").toggle(300);
    return $("#tweet-text").focus();
  });

  //prevent attacks by checking for special characters
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function (tweets) {
    const allTweetsContainer = $(".all-tweets-container");
    allTweetsContainer.empty();
    for (let singleTweet of tweets) {
      let $tweet = createTweetElement(singleTweet);

      allTweetsContainer.append($tweet);
    }
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

    return $tweet;
  };

  const loadTweets = function () {
    $.get("/tweets/", function (newTweet) {
      renderTweets(newTweet.reverse());
    });
  };

  loadTweets();

  //form submission handler
  $("#tweet-form").submit(function (event) {
    event.preventDefault();

    $(".errorEmptyField").hide(200);
    $(".errorLength").hide(200);

    let max = 140;
    let inputLength = $(this).find("#tweet-text").val().length;

    if (!inputLength) {
      return $(".errorEmptyField").show(1200);
    }

    if (inputLength - max > 0) {
      return $(".errorLength").show(1200);
    }
    const newTweet = $(this).serialize();

    $.post("/tweets/", newTweet, () => {
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val(140);
    }).then(function () {
      loadTweets();
    });
  });
});
