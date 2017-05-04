/** Handle the various UI elements.
 */
 
 
/** Show the hidden help panel */
document.getElementById("help").addEventListener("click", function(e) {
  var display_flag = document.getElementById("commands").style.display;
  if (display_flag === "none") {
    Game.mapBox.clientHeight -= document.getElementById("commands").clientHeight;
    display_flag = "";
  } else {
    Game.mapBox.clientHeight = document.getElementById("contentDiv").clientHeight;
    display_flag = "none";
  }
  document.getElementById("commands").style.display = display_flag;

  Game.resetFontSize();
  Game.resetNumRowsCols(0, -document.getElementById("commands").clientHeight);
  Game.drawMap();
});


var UI = {
  directions: {36: [-1, -1], 38: [-1, 0], 33: [-1, 1],  // row, col
               37: [0, -1],  12: [0, 0],  39: [0, 1],
               35: [1, -1],  40: [1, 0],  34: [1, 1],
               32: [0, 0]},

  gameplay: function() {
    window.addEventListener('keydown', function(e) {
      var key = e.keyCode;
      if (key in UI.directions) {
         Player.move(UI.directions[key]);
         Game.drawMap();
      }
    });
  }
}