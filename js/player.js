var Player = {
	r: 0,
	c: 0,
	symbol: '@',
	color: 'yellow',  /** TODO: Color could indicate health */
	health: 1.0,

	init: function() {
		console.log("player.init");
	},

	timeTraveled: function(distance, elev0, elev1, land_cover) {
	  /** Calculate the time it takes for the hiker to travel a given distance. */
	  var toblersRule = function(slope) {
	    /** Calculate a hiker's pace in minutes per meter
	        https://en.wikipedia.org/wiki/Tobler's_hiking_function
	     */
	    var pac = 0.01 * Math.exp(3.5 * Math.abs(0.05 + slope));
	    if (pac < 20) {
	    	return pac;
	    } else {
	    	return 20.0;
	    }
	  }
	  
	  var pace = toblersRule((elev1 - elev0) / 30.0);
	  var land_cover_factor = 3 * (land_cover / 100.0);
	  
	  return pace * distance * land_cover_factor;
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
				    var dist = map_data["edge_meters"];
				    if ((direction[0] != 0) && (direction[1] != 0)) {
				    	dist *= 1.4142135623730951;
				    }
				    Astronomy.advanceTime(this.timeTraveled(dist, map_data["elevation"][this.r][this.c], map_data["elevation"][new_r][new_c], map_data["land_cover"][new_r][new_c]));
				}
			}
		}
	},

	draw: function() {
		// TODO: I would like to move this Game and UI stuff out of this class
		Game.display.draw(this.c - Game.corner_col, this.r - Game.corner_row, this.symbol, this.color, 'rgba(' + land_cover_colors[map_data["land_cover"][this.r][this.c]] + ',1)');
		document.getElementById('elev').innerText = map_data["elevation"][this.r][this.c];
	}
}


var Astronomy = {
	time: new Date(),

	init: function(d) {
		this.time = d;
	},

	advanceTime: function(minutes) {
		this.time.addMinutes(minutes);
	},

	getTimeString: function() {  // TODO: Does Date not have string formatting?
		var hr = this.time.getHours();
		var ampm = (hr < 12) ? " AM" : " PM";
		if (hr < 13) {
			return hr.toString() + ":" + this.time.getMinutes().toString().padStart(2, "0") + ampm;
		} else {
			return (hr - 12).toString() + ":" + this.time.getMinutes().toString().padStart(2, "0") + ampm;
		}
	}
}