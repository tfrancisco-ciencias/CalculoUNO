$(document).ready(function() {

const startButton = document.getElementById('start-button');
const solutionsButton= document.getElementById('solutions-button');
const nextButton = document.getElementById('next-button');
const questionContainerElement = document.getElementById('question-container');
const quizConteinerElement = document.getElementById("quiz-container");
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const solutionContainer = document.getElementById("solution-container");

let   currentQuestionIndex ;


/* This part is for creating question and sol text, used below
const questionTextElement= document.getElementById("question-text");
const solutionTextElement= document.getElementById("solution-text");
*/



startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

solutionsButton.addEventListener("click",showSolutions)

function startGame() {
  startButton.classList.add('hide')
  solutionsButton.classList.add("hide")
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  solutionContainer.classList.add('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(questions[currentQuestionIndex])
}



function showQuestion(question) {
  questionElement.innerText = question.question
  MathJax.Hub.Queue(['Typeset', MathJax.Hub, "questionElement"]);
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, answer.text]);
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
  /* This part is for creating question and sol text
  the problem is that text should be in single line
  in questions object
  const divQuestionText= document.createElement("div")
  divQuestionText.innerText = question.question
  divQuestionText.classList.add("ejercicio-box")
  questionTextElement.appendChild(divQuestionText)
  const divSolutionText = document.createElement("div")
  divSolutionText.innerText= question.solution
  divSolutionText.classList.add("resp-box")
  questionTextElement.appendChild(divSolutionText)
  */
}



function showSolutions(){
  clearStatusClass(document.body)
  quizConteinerElement.classList.add("hide")
  console.log("solutions")
  solutionContainer.classList.remove("hide")
}



function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  /*This part is for showing questions at random
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)

  })*/
  if(correct){
    console.log(true)
  }else{
    console.log(false)
  }

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Reiniciar'
    startButton.classList.remove('hide')
    solutionsButton.classList.remove("hide")
    }
  }


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: " Encuentra el supremo del conjunto $A=\\{1-\\frac{3}{n}:n=1,2,\\dots \\}$.",
    answers: [
      { text: '$ 1 $', correct: true },
      { text: '$ 0 $', correct: false },
      { text: '$ 3 $', correct: false }
    ]
  },
  {
    question: 'Encuentra el ínfimo del conjunto $B=\\{\\frac{1}{nm}: n,m \\in \\mathbb{N} \\}$.',
    answers: [
      { text: '$ 0 $', correct: true },
      { text: '$ 1  $', correct: false },
      { text: '$ \\frac{1}{4}  $', correct: false }
    ]
  }
]




});
