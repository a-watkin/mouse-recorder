var buttonState = 0;
var move = [];
var record = true;

var currentX;
var currentY;

$(function () {
  var url = window.location.href; // Returns full URL

  $("h4").text("The current page URL is: " + url);

  $(document).click(function () {
    clicked = "clicked" + " at " + currentX + " by " + currentY;

    clicked = "clicked" + " at " + currentX + " by " + currentY;
    $("ul").append("<li>" + clicked + "</li>");
  });

  // this function is from stackoverflow
  function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime();
    if (
      typeof performance !== "undefined" &&
      typeof performance.now === "function"
    ) {
      d += performance.now(); //use high-precision timer if available
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  $("h2").text("Unique ID is " + generateUUID());

  var pageWidth = $(window).width();

  var pageHeight = $(window).height();

  $("h3").text(
    "The page width is " + pageWidth + " the page length is " + pageHeight
  );

  // event handler for window size
  window.onresize = function () {
    document.getElementById("sub-heading").innerHTML =
      " window height " +
      $(window).height() +
      " window width " +
      $(window).width();
  };

  $(document).mousemove(function (event) {
    // push the coordinates into an array
    // if you have this here it breaks the function
    // obj.push({event.pageX, event.pageY});
    currentX = event.pageX;
    currentY = event.pageY;

    $("span").text(
      "X: " +
      event.pageX +
      ", Y: " +
      event.pageY +
      " the length of the array of captured data is: " +
      move.length
    );

    x = event.pageX;
    y = event.pageY;
  });

  $("#record").on("click", function () {
    // change button text
    $("#record").text("Stop recording");

    if (buttonState == 0) {
      $("h1").text("Recording the position of mouse.");
      buttonState = 1;
      record = true;

      $(document).mousemove(function (e) {
        if (record == true) {
          move.push({
            x: e.pageX,
            y: e.pageY
          });
        }
      });
    } else if (buttonState == 1) {
      $("h1").text("Stopped recording the mouse position.");
      buttonState = 0;

      // change button text
      $("#record").text("Continue recording");

      record = false;
    }
  });

  $("#play").on("click", function () {
    if (record == true) {
      // stop capturing data
      record = false;

      $("h1").text("Stopped recording the mouse position.");
      $("#record").text("Continue recording");
    }

    var $replay = $(".cursor"),
      pos,
      i = 0,
      len = move.length,
      t;

    (function anim() {
      pos = move[i];
      $replay.css({
        top: pos.y,
        left: pos.x
      });

      i++;

      if (i === len) {
        clearTimeout(t);
      } else {
        // second argument here controls the playback time
        t = setTimeout(anim, 40);
      }
    })();
  });
});
