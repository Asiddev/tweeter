$("document").ready(function () {
  $("tweet-text").keyup(function (e) {
    console.log(e.target.value);
  });
});
