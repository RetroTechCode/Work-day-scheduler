// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Global variables
  var currentTime = dayjs();
  var blockNumber = $(".time-block").map(function () { return (this.id) }).toArray();

  // Event listener for the user clicking on the save button
  $(".btn").click(saveEvent);

  function saveEvent() {
        // Variables for the user input description along with the block number.
        var blockHour = $(this).parent().attr("id");
        var desc = $(this).siblings(".description").val();
        var blockHourDisplay = $(this).siblings(".hour").text();
    
        // Save information to local storage
        localStorage.setItem(blockHour, desc);
    
        // Send alert to the user upon save informing them of a successful save including
        // what input they saved along with the hour they saved to.
        alert("Saved event to " + blockHourDisplay + "!\n" + desc);
  }

  // Run the checkTime function when the page is initially loaded then runs again every second.
  checkTime();
  setInterval(checkTime, 1000);

  // Checks the current time to update the color coding of the time blocks.
  function checkTime() {
    for (var i = 0; i < blockNumber.length; i++) {
      var blockNumberEl = document.getElementById(blockNumber[i]);
      var currentHour = dayjs().get("hour");
      // Clear colors in order to update them without conflict
      blockNumberEl.classList.remove("past", "present", "future");

      // Update the colors based on whether the time block is referencing past, present, or future hours.
      if (blockNumber[i] < currentHour) {
        blockNumberEl.classList.add("past");
      } else if (blockNumber[i] == currentHour) {
        blockNumberEl.classList.add("present");
      } else {
        blockNumberEl.classList.add("future");
      }
    }
  };

  // Set the descriptions to the saved events when the page intially loads.
  loadEvent();

  function loadEvent() {
    var eventList = [];
    // Push all saved events into an array
    for (var i = 0; i < blockNumber.length; i++) {
      eventList.push(localStorage.getItem(blockNumber[i]));
    }
    // Align the event array with their specific time-block and display them on the page
    $(".description").each(function() {
      var taskNumber = ($(this).closest(".time-block").attr("id"))-9;
      $(this).text(eventList[taskNumber]);
    })
  };


  // Load the date/time when the page is initially loaded.
  date();
  // Update the time/date every second.
  setInterval(date, 1000);
  // Set format and display the current date and time.
  function date() {
    var currentTime = dayjs();
    $("#currentDay").text(currentTime.format("[It is] MMMM D, YYYY [ at ]hh:mm:ssa"));
  }
});