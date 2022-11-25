// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentTime = dayjs();
  var blockNumber = $(".time-block").map(function () { return (this.id) }).toArray();
  console.log(blockNumber);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  setInterval(checkTime, 10000);

  function checkTime() {
    console.log("checkTime");
    for (var i = 0; i < blockNumber.length; i++) {
      var pastHour = document.getElementById(blockNumber);
      var currentHour = dayjs().get("hour");

      if (blockNumber[i] < currentHour) {
        console.log(blockNumber[i], "PAST");

      } else if (blockNumber[i] == currentHour) {
        console.log(blockNumber[i], "CURRENT");

      } else {
        console.log(blockNumber[i], "FUTURE");
      }
    }
  }



  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  setInterval(function () {
    var currentTime = dayjs();
    $("#currentDay").text(currentTime.format("[It is] MMMM D, YYYY [ at ]hh:mm:ssa"));
  }, 1000);
});
