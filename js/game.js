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
  	/** initialize the ROT canvas and game state */
    var mapBox = document.getElementById("mapBox");
    this.display = new ROT.Display({
      fontFamily: this.font,
      forceSquareRatio: true,
      spacing: 1.0,
      width: this.width,
      height: this.height
    });

    /** add the ROT canvas to the screen */
    this.mapBox = this.display.getContainer();
    mapBox.appendChild(this.mapBox);

    /** make sure the canvas is the maximal size for the screen */
    var contentDiv = document.getElementById("contentDiv");
    this.mapBox.width = contentDiv.clientWidth;
    this.mapBox.height = contentDiv.clientHeight;
    this.resetFontSize();
    this.resetNumRowsCols(0, 0);
    this.testBorders();
  },

  resetFontSize: function() {
  	/** reset the font size so it is maximal for at least 20 rows in each direction */
  	this.display.width = 20;
  	this.display.height = 20;
  	this.fontSize = this.display.computeFontSize(this.mapBox.clientWidth, this.mapBox.clientHeight);
    this.setOpts();
  },

  resetNumRowsCols: function(widthDiff, heightDiff) {
  	/** expand the number or rows and columns to match the current font size */
  	var contentDiv = document.getElementById("contentDiv");
  	[this.width, this.height] = this.display.computeSize(contentDiv.clientWidth + widthDiff, contentDiv.clientHeight + heightDiff);
    this.setOpts();
  },

  setOpts: function() {
  	/** reset the ROT canvas options */
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
