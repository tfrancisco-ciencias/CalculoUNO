$(document).ready(function() {

const startButton = document.getElementById('start-button');
const solutionsButton= document.getElementById('solutions-button');
const nextButton = document.getElementById('next-button');
const questionContainerElement = document.getElementById('question-container');
const quizConteinerElement = document.getElementById("quiz-container");
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let   currentQuestionIndex ;

const questionTextElement= document.getElementById("question-text");
const resultsElement = document.getElementById("results-container");




startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

solutionsButton.addEventListener("click",showSolutions)

function startGame() {
  startButton.classList.add('hide')
  solutionsButton.classList.add("hide")
  resultsElement.classList.add("hide")
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  resetSolutions()
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(questions[currentQuestionIndex])
}



function showQuestion(question) {

  const divQuestionText= document.createElement("div")
  divQuestionText.innerText = questions[currentQuestionIndex].question
  MathJax.Hub.Queue(['Typeset', MathJax.Hub, questions[currentQuestionIndex].question])
  divQuestionText.classList.add("ejercicio-box")
  questionTextElement.appendChild(divQuestionText)


  const divSolutionText = document.createElement("div")
  questions[currentQuestionIndex].solutionLines.forEach( solutionLine =>{
  const lineText = document.createElement("p")
  lineText.innerText = solutionLine.text
  MathJax.Hub.Queue(['Typeset', MathJax.Hub, solutionLine.text])
  divSolutionText.append(lineText)
  divSolutionText.classList.add("resp-box")
  })
  questionTextElement.appendChild(divSolutionText)

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
}



function showSolutions(){
  clearStatusClass(document.body)
  console.log("solutions")
  resultsElement.classList.remove("hide")
  questionContainerElement.classList.add('hide')
}



function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
  }

function resetSolutions(){
  while(questionTextElement.firstChild){
    questionTextElement.removeChild(questionTextElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)

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
    //solutionsButton.classList.remove("hide")
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


/// question agrupa las preguntas y opciones, esta la parte que hay que modificar
/// para cada quiz
const questions = [
  {
    question: "Calcula $\\lim_{x\\to 7^+} \\frac{|x-7|}{x^2-5x-14}$. Justifica tu respuesta." ,
    answers: [
      { text: 'no existe', correct: false },
      { text: '1/9', correct: true },
      { text: '-1/9', correct: false },
    ],
    solutionLines:[
      {text: " "},
      {text: " "},
      {text: " "},
    ]
  },
  {
    question: "Si $\\lim_{x\\to 25} \\left( \\frac{2f(x)-3}{\\sqrt{x}-5}+x \\right)=2$, encuentra $\\lim_{x\\to 25}f(x)$.",
    answers: [
      { text: "$-10$", correct: false},
      { text: "$3/2$", correct: true},
      { text: "$25$", correct: false},
    ],
    solutionLines:[
      {text:" "},
      {text:" "},
      {text:"$ "},
    ]
  },
]



});
