/* eslint-disable no-undef */

$("document").ready(function () {
  $("#tweet-text").keyup(function () {
    const input = $(this);
    const text = input.val();

    const remainingCharacters = 140 - text.length;

    let $tweetCount = $(this).parent().find(".counter");
    $tweetCount.text(remainingCharacters);

    if (remainingCharacters < 0) {
      $tweetCount.css("color", "red");
      $tweetCount.css("font-size", "3.2rem");
      $tweetCount.css("transition", "all 1s");
      $tweetCount.css("translate", "scale(1.4)");
    } else {
      $tweetCount.css("color", "#545149");
      $tweetCount.css("font-size", "2rem");
    }
  });
});
