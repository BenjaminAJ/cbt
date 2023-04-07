const timer = document.getElementById("timer");
const timeup = document.getElementById("timeup");
const startBtn = document.getElementById("startBtn");
let timeobj = { sec: "" };
let questionobj = { 
    question: "",
    answer: '',
    options :[],
 };
let timerinterval;

function start(params) {
  startCountdown();
  startBtn.style.display = 'none';
}
function submit(params) {
  stopCountdown();
}
function startCountdown(params) {
  timeobj.sec = timer.value;
  timerinterval = setInterval(() => {
    if (timeobj.sec == 0) {
      clearInterval(timerinterval);
      submit();
      timeup.innerText = "*Time up";
    } else if (timeobj.sec > 0) {
      timeobj.sec--;
      timer.value = timeobj.sec;
    }
  }, 1000);
}
function stopCountdown(params) {
  clearInterval(timerinterval);
}
