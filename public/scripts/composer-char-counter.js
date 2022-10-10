$("document").ready(function () {
  console.log("working!");

  $("#tweet-text").keyup(function (e) {
    let charactersLeft = 140;
    let charactersUsed = 0;

    if (charactersUsed < charactersLeft) {
      if (e.key === "Backspace") {
        charactersLeft -= this.value.length;
        charactersUsed += this.value.length;
      } else {
        charactersLeft -= this.value.length;
        charactersUsed += this.value.length;
      }

      $("#tweet-count").val(charactersLeft);
    }
    if (charactersLeft < 0) {
      $("#tweet-count").css("color", "red");
    } else {
      $("#tweet-count").css("color", "#545149");
    }
    console.log("counterUsed", charactersUsed);
    console.log("charatersLeft", charactersLeft);
  });
});
