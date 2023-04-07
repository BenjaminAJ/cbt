const timer = document.getElementById("timer");
const timeup = document.getElementById("timeup");
const startBtn = document.getElementById("startBtn");
const questionCont = document.getElementById("questionContainer");
const resultCont = document.getElementById("resultContainer");
let timeobj = { sec: "" };
let questionobj = { 
    question: "",
    answer: '',
    options :[],
 };
let timerinterval;
let score;

function start(params) {
  startCountdown();
  startBtn.style.display = 'none';
  questionCont.innerHTML = `
    <div class="row"><h3>Question</h3></div>
    <div class="row">
      <div class="col-auto">
        <button class="btn btn-secondary" onclick="previous()">Previous</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-secondary" onclick="next()">Next</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-secondary" onclick="submit()">Submit</button>
      </div>
    </div>
  `;
}
function submit(params) {
  stopCountdown();
  questionCont.style.display = 'none';
  if (score > 50) {
    resultCont.innerHTML =`
    <div class="row"><h3>Congratulations!!!</h3></div>
  
    `;
  }
  else{
    resultCont.innerHTML =`
    <div class="row"><h3>Better luck next time.</h3></div>
  
    `;
  
  }
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
