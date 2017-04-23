/** The main Game controller, that will contain and organize:
    ROT.display,
    the player object,
    the map object,
    and the main UI.
 */
 
var Game = {
  display: null,
  mapBox: null,
  map: null,
  font: "Courier New",
  fontSize: 20,
  width: 20,
  height: 20,

  init: function() {
    var mapBox = document.getElementById("mapBox");
    this.display = new ROT.Display({
      fontFamily: this.font,
      forceSquareRatio: true,
      spacing: 1.0,
      width: this.width,
      height: this.height
    });

    this.mapBox = this.display.getContainer();
    mapBox.appendChild(this.mapBox);

    // make sure the canvas is the maximal size for the screen
    this.mapBox.width = document.getElementById("contentDiv").clientWidth;
    this.mapBox.height = document.getElementById("contentDiv").clientHeight;

    this.fontSize = this.display.computeFontSize(this.mapBox.clientWidth, this.mapBox.clientHeight);
    this.setOpts();

    // get new rows/cols
    [this.width, this.height] = this.display.computeSize(document.getElementById("contentDiv").clientWidth, document.getElementById("contentDiv").clientHeight)

    this.setOpts();
    this.testBorders();
  },

  setOpts: function() {
    this.display.setOptions({
      fontFamily: this.font,
      forceSquareRatio: true,
      spacing: 1.0,
      border: 0,
      width: this.width,
      height: this.height,
      fontSize: this.fontSize
    });
  },

  testBorders: function() {
    /** This is only a test */
    for (var col = 0; col < this.width; col++) {
      this.display.draw(col, 0, "♣", "gray");
      this.display.draw(col, this.height - 1, "♣", "gray");
    }
    for (var row = 1; row < this.height; row++) {
      this.display.draw(0, row, "♣", "gray");
      this.display.draw(this.width - 1, row, "♣", "gray");
    }
  }
};
