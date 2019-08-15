const Moon = {
  phases: [
    "New Moon",
    "Waxing Crescent Moon",
    "Quarter Moon",
    "Waxing Gibbous Moon",
    "Full Moon",
    "Waning Gibbous Moon",
    "Last Quarter Moon",
    "Waning Crescent Moon"
  ],
  phase: function(year, month, day) {
    let c,
      b,
      jd,
      e = 0;

    if (month < 3) {
      year--;
      month += 12;
    }

    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0
    return { phase: b, name: Moon.phases[b] };
  }
};
export default Moon;
