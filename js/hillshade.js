/** ESRI HillShade algo:
    http://edndoc.esri.com/arcobjects/9.2/NET/shared/geoprocessing/spatial_analyst_tools/how_hillshade_works.htm
 */
var HillShade = (function() {
  /** placeholder elevation grid variables */
  var el = [];
  var num_rows = 0;
  var num_cols = 0;

  /** TODO: Strange constants. Play with these. */
  var z_factor = 1.0;
  var cell_size = 35.0;

  /** Testing input data. */
  var zen_rad = 0.7853981633974483;
  var azi_rad = 0.356194490192345;

  var calc_hillshade = function(Zenith_rad, Slope_rad, Azimuth_rad, Aspect_rad) {
    /** Actual hill shade algorithm */
    return (Math.cos(Zenith_rad) * Math.cos(Slope_rad)) +
      (Math.sin(Zenith_rad) * Math.sin(Slope_rad) * Math.cos(Azimuth_rad - Aspect_rad));
  };

  var calc_slope_x = function(r, c) {
    /** Find the slope in the X direction */
    return ((el[r - 1][c + 1] + 2 * el[r][c + 1] + el[r + 1][c + 1]) - (el[r - 1][c - 1] + 2 * el[r][c - 1] + el[r + 1][c - 1])) / (8 * cell_size);
  };

  var calc_slope_y = function(r, c) {
    /** Find the slope in the Y direction */
    return ((el[r + 1][c - 1] + 2 * el[r + 1][c] + el[r + 1][c + 1]) - (el[r - 1][c - 1] + 2 * el[r - 1][c] + el[r - 1][c + 1])) / (8 * cell_size);
  };

  var calc_slope_rad = function(dz_dx, dz_dy) {
    /** Slope_rad = ATAN ( z_factor * √ ( [dz/dx]2 + [dz/dy]2) ) */
    return Math.atan(z_factor * Math.sqrt((dz_dx * dz_dx) + (dz_dy * dz_dy)));
  };

  var calc_aspect_rad = function(dz_dx, dz_dy) {
    var aspect_rad;  // TODO: default?
    if (dz_dx != 0.0) {
      aspect_rad = Math.atan2(dz_dy, -dz_dx);
    }
    if (aspect_rad < 0) {
      aspect_rad += 6.283185307179586;
    }
    if (dz_dx == 0.0) {
      if (dz_dy >= 0) {
        aspect_rad = 1.5707963267948966;
      } else if (dz_dy < 0) {
        aspect_rad = 4.71238898038469;
      }
    }

    return aspect_rad
  };

  var buffer_elevation = function() {
    /** Buffer the elevation map so there is an extra grid cell of copied elevations all around the rim. */
    el[-1] = el[0];
    el[num_rows] = el[num_rows - 1];
    for (var r = -1; r <= num_rows; r++) {
      el[r][-1] = el[r][0];
      el[r][num_rows] = el[r][num_rows - 1];
    }
  };

  return {
    init: function(elevation) {
      /** initialize hill shade object with elevation grid */
      el = elevation;
      num_rows = elevation.length;
      num_cols = elevation[0].length;
      buffer_elevation();
    },
    calc: function(r, c) {
      /** calculate the hill shade for one grid cell */
      var dz_dx = calc_slope_x(r, c);
      var dz_dy = calc_slope_y(r, c);
      var srad = calc_slope_rad(dz_dx, dz_dy);
      var asrad = calc_aspect_rad(dz_dx, dz_dy);
      var result = calc_hillshade(zen_rad, srad, azi_rad, asrad);
      if (result > 0.1) {
        return result;
      } else {
        return 0.1;
      }
    },
    setZenith: function(rads) {
      /** Zenith_degress = 90 - Altitude_degrees
          Zenith_rad = Zenith * pi / 180.0
       */
      zen_rad = rads;
    },
    setAzimuth: function(rads) {
      /** Azimuth_math = 360.0 - Azimuth_degrees + 90
          Azimuth_math = Azimuth_math - 360.0
          Azimuth_rad = Azimuth_math *  pi / 180.0
       */
      azi_rad = rads;
    },
    setSunPosition: function(zen, azi) {
      /** Set the Sun's zenith and azimuth angles, in radians. */
      zen_rad = zen;
      azi_rad = azi;
    },
    grid: function(min_row, min_col, nrows, ncols) {
      /** return an entire grid of hillshade values
        * Note the complete lack of boundary checking.
        */
      var map = [];
      for (var r = min_row; r < (min_row + nrows); r++) {
        var row = [];
        for (var c = min_col; c < (min_col + ncols); c++) {
          row.push(this.calc(r, c));
        }
        map.push(row);
      }
      return map;
    }
  };
}());


/**
// TODO: Testing
var elevation = [
  [2450, 2461, 2483],
  [2452, 2461, 2483],
  [2447, 2455, 2477]
];
HillShade.init(elevation);
console.log(HillShade.calc(1, 1));
*/
