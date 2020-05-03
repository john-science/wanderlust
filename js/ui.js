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
  Footer.draw();
});


var Footer = (function() {
  var elev_element = document.getElementById('elev');
  var temp_element = document.getElementById('temp');
  var weat_element = document.getElementById('weather');
  var scor_element = document.getElementById('score');

  return {
    draw: function() {
      var eleva = map_data["elevation"][Player.r][Player.c]
      var hrs = Astronomy.time.getLocalHours();
      elev_element.innerText = eleva;
      temp_element.innerText = Weather.temp(eleva, hrs, Astronomy.time.getMonth());

      var rise_set = Sun.riseSet(-8);
      var weathr = "Twilight";
      if (hrs > (rise_set[0] + 0.5) &&  hrs < (rise_set[1] - 0.5)) {weathr = "Sunny";}
      else if (hrs > (rise_set[1]) + 0.5 || hrs < (rise_set[0] - 0.5)) {weathr = 'Night';}
      weat_element.innerText = weathr;

      scor_element.innerText = Math.ceil(Player.score);
    }
  }
})();


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
         Footer.draw();
      } else if (key in UI.waitKeys) {
         e.preventDefault();
         Player.wait(UI.waitKeys[key]);
         Game.drawMap();
         Footer.draw();
      }
    });
    document.getElementById('rest_button').addEventListener("click", function(e) {
      e.preventDefault();
      Player.wait(30);
      Game.drawMap();
      Footer.draw();
    });
    document.getElementById('sleep_button').addEventListener("click", function(e) {
      e.preventDefault();
      Player.wait(480);
      Game.drawMap();
      Footer.draw();
    });
  }
}
