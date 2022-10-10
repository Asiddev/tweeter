$("document").ready(function () {
  console.log("working!");

  $("#tweet-text").keyup(function (e) {
    let charactersLeft = 144;
    let counterUsed = 0;
    if (counterUsed < charactersLeft) {
      if (e.key === "Backspace") {
        charactersLeft -= this.value.length;
        counterUsed += this.value.length;
      } else {
        charactersLeft -= this.value.length;
        counterUsed += this.value.length;
      }
    }
    console.log("counterUsed", counterUsed);
    console.log("charatersLeft", charactersLeft);
  });
});
