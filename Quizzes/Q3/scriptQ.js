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


/// question agrupa las preguntas y opciones, esta la parte que hay que modificar
/// para cada quiz
const questions = [
  {
    question: "Resuelve la desigualdad $|4x-2| \\leq 10$",
    answers: [
      { text: '$ [-10,10] $', correct: false },
      { text: '$ [-2,3] $', correct: true },
      { text: '$ [-4,6] $', correct: false }
    ],
    solutionLines:[
      {text: "Abriendo la desigualdad $|4x-2|\\leq 10$ obtenemos"},
      {text: "$-10\\leq 4x-2 \\leq 10 \\Rightarrow -8 \\leq 4x \\leq 12$"},
      {text: "Finalmente, dividiendo entre 4 llegamos"},
      {text: "$-2 \\leq x \\leq 3$"},
    ]
  },
  {
    question: 'La desigualdad de Cauchy-Schwartz dice que $(\\sum_{i=1}^na_i^2)^{1/2}(\\sum_{i=1}^n b_i^2)^{1/2})$ es mayor a',
    answers: [
      { text: "$\\sum_{i=1}^n a_ib_i$ ", correct: true},
      { text: "$\\sum_{i=1}^n a_i^2b_i^2$", correct: false}
    ],
    solutionLines:[
      {text:"$ \\sum_{i=1}^n a_ib_i \\leq (a_1^2+\\\cdots+a_n^2)^{1/2}(b_1^2+\\cdots+a_n^2)^{1/2}  $"}
    ]
  },
  {
    question: 'Si $x,y\\geq 0$ y $xy=4$ entonces ' ,
    answers: [
      { text: '$ x+y \\geq 4$', correct: true },
      { text: '$ x+y \\geq 8 $', correct: false },
      { text: '$x+y \\geq 6 $', correct: false }
    ],
    solutionLines:[
      {text:" De $xy=4$  se sigue $(x/2)(y/2)=1$."},
      {text:" Aplicando la desigualdad de Korovkin tenemos"},
      {text:" $x/2+y/2 \\geq 2$."},
      {text:" Multiplicando por 4 la desigualdad anterior concluimos"},
      {text:" $x+y \\geq 4$."},
    ]
  }
]



});
