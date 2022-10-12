/* eslint-disable no-undef */

$("document").ready(function() {
  $("#tweet-text").keyup(function() {
    const input = $(this);
    const text = input.val();

    const remainingCharacters = 140 - text.length;

    let $tweetCount = $(this)
      .parent()
      .children()
      .children("output[name=counter]");

    $tweetCount.text(remainingCharacters);

    if (remainingCharacters < 0) {
      $tweetCount.css("color", "red");
    } else {
      $tweetCount.css("color", "#545149");
    }
  });
});
