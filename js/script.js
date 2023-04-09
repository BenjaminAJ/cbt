const timer = document.getElementById("timer");
const timeup = document.getElementById("timeup");
const signal = document.getElementById("signal");
const startBtn = document.getElementById("startBtn");
const questionCont = document.getElementById("questionContainer");
const questionWrapper = document.getElementById("questionWrapper");
const resultCont = document.getElementById("resultContainer");
let timeobj = { sec: "" };
let questionobj = { 
    question: "How old are you?",
    answer: '12',
    options :[12, 14, 50, 60],
 };
 let questionarray = [{ 
  question: "Why me?",
  answer: '12',
  options :["because it's you", 'no', 'pls', 'no idea'],
},
{ 
  question: "How old are you?",
  answer: '12',
  options :[12, 14, 50, 60],
},
{ 
  question: "How old are you?",
  answer: '12',
  options :[12, 14, 50, 60],
},
{ 
  question: "How old are you?",
  answer: '12',
  options :[12, 14, 50, 60],
},];
let timerinterval;
let score;
let questionIndex;

function start(params) {
  startCountdown();
  questionIndex = 0;
  startBtn.style.display = 'none';
  signal.innerText = 'Good luck!'
  questionWrapper.innerHTML = `
  <div class="row"><h3>Question</h3></div>
        <form class="mb-3">
          <fieldset id = "questionForm">
            <legend>${questionarray[questionIndex].question}</legend>
            <div class="row">
              <div class="col-12">
              
                <input type="radio" id="optionChoice1" name="option" value="${questionarray[questionIndex].options[0]}" />
                <label for="optionChoice1">${questionarray[questionIndex].options[0]}</label>

              </div>
              <div class="col-12"> 
                <input type="radio" id="optionChoice2" name="option" value="${questionarray[questionIndex].options[1]}" />
                <label for="optionChoice2">${questionarray[questionIndex].options[1]}</label>
              </div>

              <div class="col-12">
                <input type="radio" id="optionChoice3" name="option" value="${questionarray[questionIndex].options[2]}" />
                <label for="optionChoice3">${questionarray[questionIndex].options[2]}</label>
              
              </div>

              <div class="col-12">
                <input type="radio" id="optionChoice4" name="option" value="${questionarray[questionIndex].options[3]}" />
                <label for="optionChoice4">${questionarray[questionIndex].options[3]}</label>
              
              </div>

            </div>
          </fieldset>
      </form>

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
  let userAnswer =  getSelectedChoice();
  score = calculateScore(userAnswer);
  questionCont.style.display = 'none';
  signal.innerText = 'Thank you.'
  if (score > 50) {
    resultCont.innerHTML =`
    <div class="row"><h3>Congratulations!!!</h3></div>
    <div class="row"><h4>Your score is ${score}</h4></div>
  
    `;
  }
  else{
    resultCont.innerHTML =`
    <div class="row"><h3>Better luck next time.</h3></div>
    <div class="row"><h4>Your score is ${score}</h4></div>
  
    `;
  
  }
}
function getSelectedChoice() {
  const fieldset = document.getElementById('questionForm');
  const inputs = fieldset.getElementsByTagName('input');

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.checked) {
      console.log('Selected option:', input.value);
      return input.value;
    }
  }

  console.log('No option selected.');
  return null;
}
function calculateScore(userAnswer) {
  if (userAnswer == questionobj.answer) {
    score = 100;
  }
  else{
    score = 0
  }
  return score;
}
function next(params) {
  questionIndex++;
  questionWrapper.innerHTML = `
  <div class="row"><h3>Question</h3></div>
        <form class="mb-3">
          <fieldset id = "questionForm">
            <legend>${questionarray[questionIndex].question}</legend>
            <div class="row">
              <div class="col-12">
              
                <input type="radio" id="optionChoice1" name="option" value="${questionarray[questionIndex].options[0]}" />
                <label for="optionChoice1">${questionarray[questionIndex].options[0]}</label>

              </div>
              <div class="col-12"> 
                <input type="radio" id="optionChoice2" name="option" value="${questionarray[questionIndex].options[1]}" />
                <label for="optionChoice2">${questionarray[questionIndex].options[1]}</label>
              </div>

              <div class="col-12">
                <input type="radio" id="optionChoice3" name="option" value="${questionarray[questionIndex].options[2]}" />
                <label for="optionChoice3">${questionarray[questionIndex].options[2]}</label>
              
              </div>

              <div class="col-12">
                <input type="radio" id="optionChoice4" name="option" value="${questionarray[questionIndex].options[3]}" />
                <label for="optionChoice4">${questionarray[questionIndex].options[3]}</label>
              
              </div>

            </div>
          </fieldset>
      </form>

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
function previous(params) {
  questionIndex--;
  questionWrapper.innerHTML = `
  <div class="row"><h3>Question</h3></div>
        <form class="mb-3">
          <fieldset id = "questionForm">
            <legend>${questionarray[questionIndex].question}</legend>
            <div class="row">
              <div class="col-12">
              
                <input type="radio" id="optionChoice1" name="option" value="${questionarray[questionIndex].options[0]}" />
                <label for="optionChoice1">${questionarray[questionIndex].options[0]}</label>

              </div>
              <div class="col-12"> 
                <input type="radio" id="optionChoice2" name="option" value="${questionarray[questionIndex].options[1]}" />
                <label for="optionChoice2">${questionarray[questionIndex].options[1]}</label>
              </div>

              <div class="col-12">
                <input type="radio" id="optionChoice3" name="option" value="${questionarray[questionIndex].options[2]}" />
                <label for="optionChoice3">${questionarray[questionIndex].options[2]}</label>
              
              </div>

              <div class="col-12">
                <input type="radio" id="optionChoice4" name="option" value="${questionarray[questionIndex].options[3]}" />
                <label for="optionChoice4">${questionarray[questionIndex].options[3]}</label>
              
              </div>

            </div>
          </fieldset>
      </form>

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
