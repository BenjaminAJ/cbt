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
    userAnswer : '',
 };
 let questionarray = [{ 
  question: "What is HTML?",
  answer: 'All of the mentioned',
  options :["HTML describes the structure of a webpage", ' HTML is the standard markup language mainly used to create web pages', ' HTML consists of a set of elements that helps the browser how to view the content', 'All of the mentioned'],
  userAnswer : '',

},
{ 
  question: " Who is the father of HTML?",
  answer: 'Tim Berners-Lee',
  options :['Rasmus Lerdorf', 'Tim Berners-Lee', 'Brendan Eich', 'Sergey Brin'],
  userAnswer : '',

},
{ 
  question: "HTML stands for __________",
  answer: 'HyperText Markup Language',
  options :['HyperText Markup Language', 'HyperText Machine Language', 'HyperText Marking Language', 'HighText Marking Language'],
  userAnswer : '',

},
{ 
  question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
  answer: 'Ignores the statements',
  options :[' Gives a warning', 'Ignores the statements', 'Throws an error', 'None of the above'],
  userAnswer : '',

},
{ 
  question: " Which of the following is used to read an HTML page and render it?",
  answer: 'Web browser',
  options :[' Web matrix', 'Web server', 'Web browser', ' Web network'],
  userAnswer : '',

},
{ 
  question: " Javascript is an _______ language?",
  answer: 'Object-Oriented',
  options :[' Object-based', 'Object-Oriented', 'Procedural', ' None of the above'],
  userAnswer : '',

},
{ 
  question: " Which of the following keywords is used to define a variable in Javascript?",
  answer: 'Both A and B',
  options :[' let', 'var', 'Both A and B', ' None of the above'],
  userAnswer : '',

},];
let timerinterval;
let score;
let questionIndex;

function start(params) {
  startCountdown();
  questionIndex = 0;
  // localStorage.setItem('questionarray', JSON.stringify(questionarray))
  startBtn.style.display = 'none';
  signal.innerText = 'Good luck!'
  questionWrapper.innerHTML = `
  <div class="row"><h3>Question</h3></div>
        <form class="mb-3">
          <fieldset id = "questionForm">
            <legend>${questionIndex +1}.${questionarray[questionIndex].question}</legend>
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
  score =calculateScore();
  console.log(score);
  questionCont.style.display = 'none';
  signal.innerText = 'Thank you.'
  if (score > 50) {
    resultCont.innerHTML =`
    <div class="row"><h3>Congratulations!!!</h3></div>
    <div class="row"><h4>Your score is ${score}/${questionarray.length}.</h4></div>
  
    `;
  }
  else{
    resultCont.innerHTML =`
    <div class="row"><h3>Better luck next time.</h3></div>
    <div class="row"><h4>Your score is ${score}/${questionarray.length}.</h4></div>
  
    `;
  
  }
}
function getSelectedChoice() {
  const fieldset = document.getElementById('questionForm');
  const inputs = fieldset.getElementsByTagName('input');

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.checked) {
      // console.log('Selected option:', input.value);
      return input.value;
    }
  }

  // console.log('No option selected.');
  return null;
}
function getUserSelectedChoice(param) {
  const fieldset = document.getElementById('questionForm');
  const inputs = fieldset.getElementsByTagName('input');

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (param == input.value) {
      input.checked = true
      return
    }
  }

  console.log('No option selected.');
  return null;
}
function calculateScore(userAnswer) {
  score = 0;
  questionarray.forEach(element => {
    if (element.userAnswer == element.answer) {
      score++;
    }
  });
  return score;
}
function next(params) {
  questionarray[questionIndex].userAnswer =getSelectedChoice();
  if (questionIndex == questionarray.length -1) {
    return
  }
  questionIndex++;
  questionWrapper.innerHTML = `
  <div class="row"><h3>Question</h3></div>
        <form class="mb-3">
          <fieldset id = "questionForm">
            <legend>${questionIndex +1}.${questionarray[questionIndex].question}</legend>
            <div class="row">
              <div class="col-12">
              
                <input type="radio" id="optionChoice1" name="option" value="${questionarray[questionIndex].options[0]}"  />
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
  let userChoice = questionarray[questionIndex].userAnswer;
  console.log(userChoice);
  if (userChoice) {
    getUserSelectedChoice(userChoice);
  }

}
function previous(params) {
  questionarray[questionIndex].userAnswer =getSelectedChoice();
  if (+questionIndex == 0) {
    return
  }
  questionIndex--;
  questionWrapper.innerHTML = `
  <div class="row"><h3>Question</h3></div>
        <form class="mb-3">
          <fieldset id = "questionForm">
            <legend>${questionIndex +1}.${questionarray[questionIndex].question}</legend>
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
  let userChoice = questionarray[questionIndex].userAnswer;
  if (userChoice) {
    getUserSelectedChoice(userChoice);
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
