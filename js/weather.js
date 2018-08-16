/** To start, we will only model the local temperature,
    more detailed region-wide weather model will come later. */
var Weather = {
  temperature: function(elevation, hr, day_of_year) {
      // mid-summer data - Weather.gov - high at 2PM, low at 5AM
      // high 32, low 15  @ 1506.322 m
      // high 22.77778, low 8.333333  @ 2782.519 m
      // high 17.77778, low 6.666667  @ 2782.519 m
      // high 35, low 20.55556  @ 726.0336 m
      // high 36.11111, low 20  @ 726.0336 m
      // high 37.22222, low 19.44444  @ 376.1232 m
      // high 37.77778, low 19.44444  @ 376.1232 m
      // high 35, low 17.77778  @ 46.9392 m
      // high 36.11111, low 17.22222  @ 46.9392 m
      // high 22.22222, low 12.22222  @ 2039.112 m
      // high 25, low 12.77778  @ 2039.112 m
      // high 16.11111, low 5  @ 1256.081 m
      // high 18.33333, low 5.555556  @ 1218.59 m
      // high 25, low 6.666667  @ 1218.59 m
      // high 18.33333, low 5.555556  @ 8600 m
      // high 20, low 6.666667  @ 8600 m
    return 13;
  }
};
