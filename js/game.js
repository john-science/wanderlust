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
  corner_row: 0,
  corner_col: 0,

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
    Player.init();
    this.drawMap();
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

  setDisplayCorner: function(center){
	/** Find the top-left corner of the portion of the map to be displayed.
		This method is usually used with the Player as the center.
	*/
	this.corner_row = center.r - Math.floor(this.height / 2);
	if (this.corner_row < 0) {
		this.corner_row = 0;
	} else if ((this.corner_row + this.height) > map_data["nrows"]) {
		this.corner_row = map_data["nrows"] - this.height;
	}

	this.corner_col = center.c - Math.floor(this.width / 2);
	if (this.corner_col < 0) {
		this.corner_col = 0;
	} else if ((this.corner_col + this.width) > map_data["ncols"]) {
		this.corner_col = map_data["ncols"] - this.width;
	}
  },

  drawMap: function() {
  	/** simple test to draw the NLCD-based map */
  	var elev_shade = HillShade.grid(this.corner_row, this.corner_col, this.height, this.width);  // TODO: Stop recalculating!
  	this.display.clear();
  	this.setDisplayCorner(Player);

  	for (var r=0; r < this.height; r++) {
  		for (var c=0; c < this.width; c++) {
  			var canopy = map_data["canopy"][r + this.corner_row][c + this.corner_col];
  			var shade = elev_shade[r][c];  /** There may also be a FOV factor one day. */
  			var canopy_color = 'rgba(25,151,25,' + shade + ')';
  			var land_color = 'rgba(' + land_cover_colors[map_data["land_cover"][r + this.corner_row][c + this.corner_col]] + ',' + shade + ')';
  		    this.display.draw(c, r, canopy_symbols[Math.floor(canopy / 10)], canopy_color, land_color);
  	    }
  	}

  	Player.draw();
  }
};


var Player = {
	r: 0,
	c: 0,
	symbol: '@',
	color: 'yellow',

	init: function() {
		console.log("player.init");
	},
	move: function(direction) {
		/** direction is a movement list: [1, 1]
		    Maximum movement along any one axis is one.
		    zero movement is waiting.
		*/
		var new_r = this.r + direction[0];
		var new_c = this.c + direction[1];
		if (new_r > -1 && new_r < map_data["nrows"]) {
			if (new_c > -1 && new_c < map_data["ncols"]) {
				if (map_data["land_cover"][new_r][new_c] > 11) {
				    this.r = new_r;
				    this.c = new_c;
				}
			}
		}
	},
	draw: function() {
		Game.display.draw(this.c - Game.corner_col, this.r - Game.corner_row, this.symbol, this.color, 'rgba(' + land_cover_colors[map_data["land_cover"][this.r][this.c]] + ',1)');
		document.getElementById('elev').innerText = map_data["elevation"][this.r][this.c];
	}
}
