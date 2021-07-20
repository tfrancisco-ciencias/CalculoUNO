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
    question: "Sean $f,g:\\mathbb{R}\\to \\mathbb{R}$ dos funciones impares. La funci\\'on producto h(x):=f(x)g(x) es:" ,
    answers: [
      { text: 'impar', correct: false },
      { text: 'par', correct: true },
      { text: 'puede ser par o impar', correct: false }
    ],
    solutionLines:[
      {text: "La funci\\'on $h$ es par pues: "},
      {text: "$h(-x)=f(-x)g(-x)$"},
      {text: "$=(-1)f(x)(-1)g(x)$"},
      {text: "$=f(x)g(x)$"},
      {text: "$=h(x)$"},
      {text: "en la segunda igualdad es donde se usa  "},
      {text: "que tanto $f$ como $g$ son impares. "},
    ]
  },
  {
    question: "Encuentra todos los polinomios de grado a lo m\'as dos, $p(x)$, que satisfacen la condici\'on : $p(1) > p(2)$",
    answers: [
      { text: "$p(x)=a_0+a_1x+a_2x^2$, con $a_1+3a_2$ negativo ", correct: true},
      { text: "$p(x)=a_0+a_1x+a_2x^2$, con $2 a_1+ a_2$ positivo ", correct: false},
      { text: "$p(x)=2+2x-3x^2$", correct: false}
    ],
    solutionLines:[
      {text:"Denotamos $p(x)=a_0+a_1x+a_2x^2$."},
      {text:"La condici\\'on $p(1)>p(2)$  se traduce a:"},
      {text:"$a_0+a_1+a_2 > a_0+2a_1+4a_2$ "},
      {text:"Cancelando ambos lados la desigualdad se simplifica a:"},
      {text:"$0> a_1+3a_2$."},
    ]
  },
  {
    question: 'Si $f:\\mathbb{R}\\to \\mathbb{R}$ es c\'oncava hacia abajo y $f \\geq 0$ entonces:' ,
    answers: [
      { text: '$ \\sqrt{f}$ es c\'oncava hacia abajo', correct: true },
      { text: '$ \\sqrt{f}$ es c\'oncava hacia arriba', correct: false },
      { text: 'ninguna de las anteriores', correct: false },
    ],
    solutionLines:[
      {text:"La funci\'on ra\'iz cuadrada es c\'oncava hacia abajo y mon\'otona creciente."},
      {text:"Por suposici\'on $f$  tambi\'en es c\'oncava hacia abajo."},
      {text:"Usando el ejercicio 4.26 resulta que $\\sqrt{f}$ tambi\'en es c\'oncava hacia abajo."}
    ]
  }
]



});
