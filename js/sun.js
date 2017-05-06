
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

  setDate: function(d) {
    this.date = d;
    this.n = d.daysSince2000();
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
  riseSet: function() {
    var j_transit = this.solarTransitTime();
    var w0 = this.hourAngle();
    var jd = this.date.JulianDate();
    return [12 - 24. * (jd - j_transit + (w0 / 6.283185307179586)) - 24 + 12 - 7, -24. * (jd - j_transit - (w0 / 6.283185307179586)) - 7];
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
console.log(Sun.riseSet());
*/
