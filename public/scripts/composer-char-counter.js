/* eslint-disable no-undef */

$("document").ready(function () {
  $("#tweet-text").keyup(function (e) {
    const input = $(this);
    const text = input.val();
    const remaining = 140 - text.length;
    //step 1- Search upwards to find form
    //step 2- Search down from the form to find the output class counter

    let $tweetCount = $(this)
      .parent()
      .children()
      .children("output[name=counter]");

    $tweetCount.text(remaining);

    if (remaining < 0) {
      $tweetCount.css("color", "red");
    } else {
      $tweetCount.css("color", "#545149");
    }
  });
});
