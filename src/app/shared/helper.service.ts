export class HelperService {
  /* getDate() returns the current date and time as a string in the 
    format: 'yyyy-mm-dd hh-mm-ss'  */
  getDate() {
    var x = new Date();
    var year = x.getFullYear();
    var month =
      x.getMonth() < 10 ? 0 + '' + (x.getMonth() + 1) : x.getMonth() + 1;
    var date = x.getDate() < 10 ? 0 + '' + x.getDate() : x.getDate();
    var time = x.toLocaleTimeString();

    /* This if-else block is there to handle the cases when the current local time
        returned by x.toLocaleTimeString() contains AM or PM and uses a single digit
        to represent the hour if it is less than 10. Earlier in some mobile browsers
        this kind of behavior was observed. But today this is not the case anymore,
        i.e. the behavior of the x.toLocaleTimeString() is same in both desktop browsers 
        and in mobile browsers. */
    if (time.includes('PM')) {
      if (parseInt(time.split(':')[0]) != 12) {
        time =
          parseInt(time.charAt(0)) +
          12 +
          time.substring(1, time.indexOf('PM') - 1);
      } else {
        time.substring(0, time.indexOf('PM') - 1);
      }
    } else if (time.includes('AM')) {
      if (parseInt(time.split(':')[0]) != 12) {
        time = time.substring(0, time.indexOf('AM') - 1);
      } else {
        time = '00' + time.substring(2, time.indexOf('AM') - 1);
      }
    }

    return year + '-' + month + '-' + date + ' ' + time;
  }
}
