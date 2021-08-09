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
    question: "Toma dos reales $0<x_1<x_2$. Encuentra el cociente diferencial de la funci\'on $f(x)=\\sqrt{x}$ en el intervalo $[x_1,x_2]$." ,
    answers: [
      { text: '$\\frac{1}{\\sqrt{x}}$', correct: false },
      { text: '$\\frac{1}{\\sqrt{x_2}+\\sqrt{x_1}}$', correct: true },
      { text: '$\\frac{1}{\\sqrt{x_2}-\\sqrt{x_1}}$', correct: false }
    ],
    solutionLines:[
      {text: "El cociente diferencial, para $x_1\\ne x_2$ es"},
      {text: "$ \\frac{\\sqrt{x_2}-\\sqrt{x_1}}{x_2-x_1} $ "},
      {text: "Multiplicando y dividiendo por el conjugado del numerador tenemos"},
      {text:"$ \\frac{\\sqrt{x_2}-\\sqrt{x_1}}{x_2-x_1}\\frac{\\sqrt{x_1}+\\sqrt{x_2}}{\\sqrt{x_2}+\\sqrt{x_1}} $"},
      {text: "despu\'es de simplificar llegamos a"},
      {text: "$\\frac{(\\sqrt{x_2})^2-(\\sqrt{x_1})^2}{(x_2-x_1)(\\sqrt{x_2}+\\sqrt{x_1})}=\\frac{(x_2-x_1)}{(x_2-x_1)(\\sqrt{x_2}+\\sqrt{x_1})}=\\frac{1}{\\sqrt{x_1}+\\sqrt{x_1}}$" }
    ]
  },
  {
    question: "Considera el polinomio $p(x)=6x-(1+x)^3$. Encuantra los puntos $c$ donde $p'(c)=0$. " ,
    answers: [
      { text: "$1\\pm \\sqrt{2}$", correct: false},
      { text: "$-1\\pm \\sqrt{2}$", correct: true},
      { text: "$\\pm \\sqrt{3}$", correct: false},
    ],
    solutionLines:[
      {text:"Usando la regla para la suma de la derivada y la regla para la potencia (ejercicio 7.10) tenemos"},
      {text:"$p'(x)=6-3(x+1)^2$ "},
      {text:"Igualando a cero y resolviendo tenemos "},
      {text:"$6=3(x+1)^2\\Rightarrow 2=(x+1)^2 \\Rightarrow \\pm \\sqrt{2}=x+1 \\Rightarrow x = -1\\pm \\sqrt{2}$"}
    ]
  },
]



});
