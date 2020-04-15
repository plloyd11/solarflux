/*
A date formatter filter for Nunjucks - MM/DD/YYYY
*/
const leftPad = (a) => a < 10 ? `0${a}` : a;

module.exports = function(dateInput) {
  const dateObject = new Date(dateInput);
  // month is zero indexed because JavaScript
  const mm = dateObject.getMonth() + 1;
  const dd = dateObject.getDate();
  const yyyy = dateObject.getFullYear();
  return `${leftPad(mm)}/${leftPad(dd)}/${yyyy}`;
}
