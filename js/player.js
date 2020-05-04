var Player = {
	r: 0,
	c: 0,
	symbol: '@',
	health: 0;  /* 0 = good, 1 = meh, 2 = tired/thirsty/bad */
	color: 'yellow',  /* yellow = good, orange = meh, red = tired/thirsty/bad */
	awake_min: -30.0,
	seen_it: {},
	exp: 0,

	init: function() {
		var start_at_edge = function() {
			var side = Math.randInt(0, 4);
			var rr = 0;
			var cc = 0;
			if (side == 0) {  // North
				rr = 0;
				cc = Math.randInt(0, map_data["ncols"]);
			} else if (side == 1) {  // South
				rr = map_data["nrows"] - 1;
				cc = Math.randInt(0, map_data["ncols"]);
			} else if (side == 2) {  // West
				rr = Math.randInt(0, map_data["nrows"]);
				cc = 0;
			} else {  // East
				rr = Math.randInt(0, map_data["nrows"]);
				cc = map_data["ncols"] - 1;
			}
			return [rr, cc];
		};

		[this.r, this.c] = start_at_edge();
		while (map_data["land_cover"][this.r][this.c] <= 11) {
			[this.r, this.c] = start_at_edge();
		}
	},

	timeTraveled: function(distance, elev0, elev1, land_cover) {
		/** Calculate the time it takes for the hiker to travel a given distance. */
		var toblersRule = function(slope) {
			/** Calculate a hiker's pace in minutes per meter
			https://en.wikipedia.org/wiki/Tobler's_hiking_function
			 */
			var pac = 0.01 * Math.exp(3.5 * Math.abs(0.05 + slope));
			if (pac > 0.5) { return 0.5; }
			else { return pac; }
		};

		var pace = toblersRule((elev1 - elev0) / 30.0);
		var land_cover_factor = 1.0 + 6.0 * (land_cover / 100.0)**2;

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
				if (map_data["land_cover"][new_r][new_c] > 11) {  /* don't move onto water */
					/* Determine the distance moved */
					this.r = new_r;
					this.c = new_c;
					var dist = map_data["edge_meters"];
					if ((direction[0] != 0) && (direction[1] != 0)) {
						/* moving diagonally */
						dist *= 1.4142135623730951;
					}

					/* Let time pass while they move */
					var time = this.timeTraveled(dist, map_data["elevation"][this.r][this.c],
												map_data["elevation"][new_r][new_c], map_data["land_cover"][new_r][new_c]);
					if (this.health > 1 ) {time *= this.health;}  /* Very tired people hike slower */
					Astronomy.advanceTime(time);
					this.awake_min += time;

					/* Update the Experience */
					this.exp += time;  /* Walking is always worthwhile */
					if (!this.seen_it.hasOwnProperty([new_r>>2, new_c>>2])) {
						/* Exploring new places is good for the soul */
						this.exp += time;
					}

					/* Update the exploration history */
					this.seen_it[[new_r>>2, new_c>>2]] = true;
				}
			}
		}
	},

	wait: function(minutes) {
		Astronomy.advanceTime(minutes);
		this.sleep(minutes);

		if (minutes < 61) {
			/* Contemplative sitting is worth at least as much as rushing around */
			this.exp += 2 * minutes;
		} else {
			/* Sleeping is great, but you aren't really experiencing much. */
			this.exp += minutes / 16;
		}
	},

	sleep: function(minutes) {
		/** TODO: this logic could be more continuous */
		if (minutes > 539) {this.awake_min = -30.0;}
		else if (minutes > 449) {this.awake_min = 0.0;}
		else if (minutes > 359) {this.awake_min = 60.0;}
	},

	health_color: function() {
		if (this.health >= 2) {this.color = 'red';}
		else if (this.health >= 1) {this.color = 'orange';}
		else {this.color = 'yellow';}
	},

	calc_health: function() {
		/* For now, a player's health is entirely how sleepy they are */
		if (this.awake_min > (960)) {this.health = 2;}  /* 16 hrs */
		else if (this.awake_min > (840)) {this.health = 1;}  /* 14 hrs */
		else {this.health = 0;}

		this.health_color();
	},

	draw: function() {
		this.calc_health();

		Game.display.draw(this.c - Game.corner_col, this.r - Game.corner_row, this.symbol, this.color,
						  'rgba(' + land_cover_colors[map_data["land_cover"][this.r][this.c]] + ',1)');
	}
}
