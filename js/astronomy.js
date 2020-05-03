
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
  rs: [7, 16],
  rs_n: -1,

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
  calcRiseSet: function(tz) {
    var j_transit = this.solarTransitTime();
    var w0 = this.hourAngle();
    var jd = this.date.JulianDate();
    this.rs = [(-24. * (jd - j_transit + (w0 / 6.283185307179586)) + tz) % 24, (-24. * (jd - j_transit - (w0 / 6.283185307179586)) + tz) % 24];
    if (this.rs[0] < 0) {this.rs[0] += 24;}
    if (this.rs[1] < 0) {this.rs[1] += 24;}
    this.rs_n = this.n>>2;
  },
  riseSet: function(tz) {
    /** Memoize this calculation, to only recalc once every 4 days */
    if (this.rs_n != this.n>>2) {
      this.calcRiseSet(tz);
    }
    return this.rs;
  },
  getZenith: function() {
    return this.zenith;
  },
  getAzimuth: function() {
    return this.azimuth;
  },
  updatePosition: function() {
    /** Calculate the Zenith/Azimuth path of the Sun across the sky
    zenith = pi/4 * sin((azimuth - 0.54)/(pi/2)) - 0.2
    NOTE: this is just a mid-Northern-latitude, Summer day-only placeholder */
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


/** TODO: all I want are: (a) rise/set times and (b) full/half/new/no moon status */
var Moon = {};


var Astronomy = {
  /** This is the central location for all time in the game. */
  time: new Date(),

  init: function(d) {
    this.time = d;
  },

  advanceTime: function(minutes) {
    this.time.addMinutes(minutes);
    Sun.setDate(this.time);
  }
}
