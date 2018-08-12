
var Sun = {
  /** Basic Earth-centric model of the Sun's path across the sky
      https://en.wikipedia.org/wiki/Position_of_the_Sun
      https://en.wikipedia.org/wiki/Sunrise_equation
  */
  date: new Date(),
  n: (new Date()).daysSince2000(),
  /** Default: Mount Whitney */
  latitude: 36.5782684,
  longitude: -118.2934244,
  /** Testing data. */
  zenith: 0.7853981633974483,
  azimuth: 2.356194490192345,

  setDate: function(d) {
    this.date = d;
    this.n = d.daysSince2000();
  },
  getDate: function() {
    return this.date;
  },
  setLocation: function(lat, lon) {
    this.latitude = lat;
    this.longitude = lon;
  },
  meanLongitude: function() {
    return 4.894950420143297 + 0.017202792393721557 * this.n;
  },
  meanAnomoly: function() {
    return 6.240040768070287 + 0.017201970343643867 * this.n;
  },
  eclipticLongitude: function() {
    var g = this.meanAnomoly();
    return this.meanLongitude(this.n) + 0.033423055175691406 * Math.cos(g) + 0.00034906585039886593 * Math.sin(2.0 * g);
  },
  obliquityEcliptic: function() {
    return 0.4265410158948942 + 6.981317007977318e-9 * this.n;
  },
  sunsDeclination: function() {
    return Math.asin(Math.sin(this.obliquityEcliptic()) * Math.sin(this.eclipticLongitude()));
  },
  hourAngle: function() {
    return Math.acos(-1.0 * Math.tan(Math.deg2rad(this.latitude)) * Math.tan(this.sunsDeclination()));
  },
  meanSolarNoon: function() {
    return this.n - (this.longitude / 360.);
  },
  solarTransitTime: function() {
    return 2451545.5 + this.meanSolarNoon() + 0.0053 * Math.sin(this.meanAnomoly()) - 0.0069 * Math.sin(2.0 * this.eclipticLongitude());
  },
  riseSet: function(tz) {
    /** TODO: Could be memoized, to only recalc once per day / week / month */
    var j_transit = this.solarTransitTime();
    var w0 = this.hourAngle();
    var jd = this.date.JulianDate();
    var rs = [(-24. * (jd - j_transit + (w0 / 6.283185307179586)) + tz) % 24, (-24. * (jd - j_transit - (w0 / 6.283185307179586)) + tz) % 24];
    if (rs[0] < 0) {rs[0] += 24;}
    if (rs[1] < 0) {rs[1] += 24;}
    return rs;
  },
  getZenith: function() {
    return this.zenith;
  },
  getAzimuth: function() {
    return this.azimuth;
  },
  updatePosition: function() {
    /** zenith = pi/4 * sin((azimuth - 0.54)/(pi/2)) - 0.2 */
    var rs = this.riseSet(-8);
    var hr = this.date.getLocalHrFraction();
    if (hr < rs[0] || hr > rs[1]) {
      this.azimuth = 1.0;
    } else {
      this.azimuth = 1.0 + (Math.abs(hr - rs[0]) / Math.abs(rs[1] - rs[0])) * 4.0;
    }
    this.zenith = 0.7853981633974483 * Math.sin((this.azimuth - 0.54) / (1.5707963267948966)) - 0.2;
  }
};


// Check your answer:  https://www.esrl.noaa.gov/gmd/grad/solcalc/
/** Test
var randomSierrasMorning = function(yr) {
  // Generate a good date to start a hike in the Sierras
  var d = new Date("July 1 2017 07:00:00 GMT-0700 (PDT)");
  d.addDays(Math.floor(Math.random() * 60));
  return d;
}

var ddd = randomSierrasMorning(2017);
console.log(ddd);
Sun.setDate(ddd);
console.log(Math.rad2deg(Sun.sunsDeclination()));
console.log(Sun.meanSolarNoon());
console.log(Sun.meanAnomoly());
console.log(Sun.solarTransitTime());
console.log(Sun.riseSet(-7));
*/


var Moon = {};


// TODO: Is there a better place to save off the time?
var Astronomy = {
  time: new Date(),

  init: function(d) {
    this.time = d;
  },

  advanceTime: function(minutes) {
    this.time.addMinutes(minutes);
  }
}
