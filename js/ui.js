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
  Game.testMap();
});

