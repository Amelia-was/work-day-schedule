// global variables
var today = dayjs().format('D MMMM YYYY');
console.log(today);

var todaySpanEl = $("#currentDay");
todaySpanEl.text(today);

