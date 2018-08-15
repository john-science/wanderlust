/** Handle the various UI elements. */
 
 
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
  moveKeys: {36: [-1, -1], 38: [-1, 0], 33: [-1, 1], 37: [0, -1],
             39: [0, 1],   35: [1, -1], 40: [1, 0],  34: [1, 1]},  // row, col
  waitKeys: {12: 30, 32: 30, 53: 30, 101: 30, 90: 480},

  gameplay: function() {
    window.addEventListener('keydown', function(e) {
      var key = e.keyCode;
      if (key in UI.moveKeys) {
         e.preventDefault();
         Player.move(UI.moveKeys[key]);
         Game.drawMap();
      } else if (key in UI.waitKeys) {
         e.preventDefault();
         Player.wait(UI.waitKeys[key]);
         Game.drawMap();
      }
    });
  }
}
