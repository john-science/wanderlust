/** additions to the Math library */

Math.radians = Math.PI / 180.0;

Math.rad2deg = function(rad) {
  /** convert radians to degrees */
  return rad / Math.radians;
}

Math.deg2rad = function(deg) {
  /** convert degrees to radians */
  return deg * Math.radians;
}

Math.randInt = function(min, max) {
  return Math.floor(min) + Math.floor(Math.random() * Math.floor(max - min));
}

Math.choice = function(items) {
  return items[Math.floor(Math.random()*items.length)];
}


/** additions to the Date library */

Date.prototype.addDays = function(d) {
  this.setTime(this.getTime() + (d * 24 * 60 * 60 * 1000));
  return this;
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
}

Date.prototype.addMinutes = function(m) {
  this.setTime(this.getTime() + (m * 60 * 1000));
  return this;
}

Date.prototype.addSeconds = function(s) {
  this.setTime(this.getTime() + (s * 1000));
  return this;
}

Date.prototype.addMS = function(ms) {
  this.setTime(this.getTime() + (s
    ));
  return this;
}

Date.prototype.JulianDate = function() {
  /** From Wikipedia https://en.wikipedia.org/wiki/Julian_day */
  var yr = this.getFullYear();
  var month = this.getMonth() + 1;
  var day = this.getDate();
  var a = Math.floor((14 - month) / 12);
  var y = yr + 4800 - a;
  var m = month + 12 * a - 3;
  return day + Math.floor((153. * m + 2.) / 5.) + 365 * y + Math.floor(y / 4.) - Math.floor(y / 100.) + Math.floor(y / 400.) - 32045;
}

Date.prototype.daysSince2000 = function() {
  return this.JulianDate() - 2451545;
}


/** Additions to the String library */

String.prototype.padString = function(length, padStr) {
    var str = this;
    while (str.length < length)
        str = padStr + str;
    return str;
}
