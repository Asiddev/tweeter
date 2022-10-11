$("document").ready(function () {
  $("#write-tweet").click(function () {
    return $(".new-tweet").toggle(250);
  });

  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize().toString().split("=").slice(1);
    console.log(this.data);

    if (data[0] === null || data[0] === "") {
      $(".errorLength").hide(500);
      return $(".errorEmptyField").show(1500);
    }

    if (data[0].length > 140) {
      $(".errorEmptyField").hide(500);
      return $(".errorLength").show(1500);
    }

    $.post("http://localhost:8080/tweets", $(this).serialize());

    setTimeout(() => {
      location.reload(true);
    }, 500);
  });

  const loadTweets = function () {
    $.get("http://localhost:8080/tweets", function (data) {
      renderTweets(data);
    });
  };

  const renderTweets = function (tweets) {
    const allTweetsContainer = $(".all-tweets-container");
    //sort by newest to oldest tweet
    const sortedDesc = tweets.sort(
      (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
    );

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

    return $tweet;
  };
  loadTweets();
});
