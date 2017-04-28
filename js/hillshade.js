var el = [ // elevation
  [2450, 2461, 2483],
  [2452, 2461, 2483],
  [2447, 2455, 2477]
];

var z_factor = 1.0; // What is this?
var cell_size = 5; // What is this?

var calc_hillshade = function(Zenith_rad, Slope_rad, Azimuth_rad, Aspect_rad) {
  return 255.0 * ((Math.cos(Zenith_rad) * Math.cos(Slope_rad)) +
    (Math.sin(Zenith_rad) * Math.sin(Slope_rad) * Math.cos(Azimuth_rad - Aspect_rad)));
};

var calc_zenith_radians = function(altitude_rad) {
  return 1.5707963267948966 - altitude_rad;
};

// TODO: What to do about edge cases?
var calc_slope_x = function(r, c) {
  // ((c + 2f + i) - (a + 2d + g)) / (8 * cellsize)
  return ((el[r - 1][c + 1] + 2 * el[r][c + 1] + el[r + 1][c + 1]) - (el[r - 1][c - 1] + 2 * el[r][c - 1] + el[r + 1][c - 1])) / (8 * cell_size);
};

// TODO: What to do about edge cases?
var calc_slope_y = function(r, c) {
  // ((g + 2h + i) - (a + 2b + c))  / (8 * cellsize)
  return ((el[r + 1][c - 1] + 2 * el[r + 1][c] + el[r + 1][c + 1]) - (el[r - 1][c - 1] + 2 * el[r - 1][c] + el[r - 1][c + 1])) / (8 * cell_size);
};


// Slope_rad = ATAN ( z_factor * √ ( [dz/dx]2 + [dz/dy]2) ) 
var calc_slope_rad = function(dz_dx, dz_dy) {
  return Math.atan(z_factor * Math.sqrt(dz_dx * dz_dx + dz_dy * dz_dy));
};

var calc_aspect_rad = function(dz_dx, dz_dy) {
  if (dz_dx !== 0.0) {
    var aspect_rad = Math.atan2(dz_dy, -dz_dx);
  }
  if (aspect_rad < 0) {
    aspect_rad += 6.283185307179586;
  }

  if (dz_dx === 0.0) {
    if (dz_dy > 0) {
      apect_rad = 1.5707963267948966;
    } else if (dz_dy < 0) {
      aspect_rad = 4.71238898038469;
    }
  }

  return aspect_rad
};


// TESTING
// alert(hillshade(0.7857142857, 1.26511, 2.3571428571, 3.310567));  // 153.82

//given
var alt_rad = 0.7853981633974483;
var azi_rad = 2.356194490192345;

// calc
var zen_rad = calc_zenith_radians(alt_rad);
var dz_dx = calc_slope_x(1, 1);
var dz_dy = calc_slope_y(1, 1);
var slop_rad = calc_slope_rad(dz_dx, dz_dy);
var asp_rad = calc_aspect_rad(dz_dx, dz_dy);

console.log(zen_rad);
console.log(slop_rad);
console.log(azi_rad);
console.log(asp_rad);
console.log(calc_hillshade(zen_rad, slop_rad, azi_rad, asp_rad));






var HillShade = (function() {
  var z_factor = 1.0;
  var cell_size = 5.0;

  var alt_rad = 0.7853981633974483;
  var azi_rad = 2.356194490192345;

  return {
    calc: function() {
      return 0.123;
    }
  };
}());

console.log(HillShade.calc());


