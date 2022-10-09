/** To start, we will only model the local temperature,
more detailed region-wide weather model will come later.
*/
var Weather = (function() {
	var hourly_temp = [0.27136, 0.16227, 0.077, 0.02173, 0.00021, 0.014, 0.0622, 0.212, 0.4219, 0.588, 0.7542, 0.85868, 0.9378, 0.98597, 0.99979, 0.97827, 0.92295, 0.83773, 0.72864, 0.60338, 0.47081, 0.34031, 0.2211, 0.1216];
	var monthly_temp = [0.28125, 0.34375, 0.4375, 0.5625, 0.6875, 0.84375, 1.0, 1.0, 0.875, 0.6875, 0.40625, 0.25];
	var monthly_precip_mm = [165, 170, 132, 71, 43, 18, 10, 2.5, 18, 53, 117, 140];
	return {
		temp: function(elevation, hour, month) {
			/** ensure elevation is in valid range (in meters) */
			var elev = elevation;
			if (elev < 10) {elev = 10.0;}
			/** high and low daily temps from weather data in the Sierras */
			var low_t = 32.1367018169 - 2.9128910336 * Math.log(elev);
			var high_t = 57.1487797207 - 4.4308206856 * Math.log(elev);
			/** use a typical data temperature profile, from weather data in the Sierras */
			var temp = low_t + hourly_temp[Math.valid_int(hour, 0, 23)] * (high_t - low_t);
			/** apply a typical monthly temp profile, from Yosemite park service data */
			temp *= monthly_temp[Math.valid_int(month, 0, 11)];
			return Math.round(temp);
		}
	}
})();
